<template>
  <div>
    <h1>Battery Checker</h1>
    <button @click="checkBatteries">Check Batteries</button>
    <div v-if="devicesNeedingReplacement.length">
      <h2>Devices needing battery replacement:</h2>
      <ul>
        <li v-for="device in devicesNeedingReplacement" :key="device">{{ device }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import batteryData from '@/data/batteryData.json';

export default {
  data() {
    return {
      devicesNeedingReplacement: []
    };
  },
  methods: {
    getTimeDifferenceInHours(start, end) {
      const startDate = new Date(start);
      const endDate = new Date(end);
      const diff = Math.abs(endDate - startDate);
      return diff / (1000 * 60 * 60);
    },
    processBatteryData(data) {
      const devices = {};

      // Group readings by device serial number
      data.forEach(entry => {
        const { serialNumber, batteryLevel, timestamp } = entry;

        if (!devices[serialNumber]) {
          devices[serialNumber] = [];
        }
        devices[serialNumber].push({ batteryLevel, timestamp });
      });

      const devicesNeedingReplacement = [];

      // Calculate battery usage for each device
      for (const [serialNumber, readings] of Object.entries(devices)) {
        readings.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

        let totalUsage = 0;
        let totalTime = 0;

        for (let i = 1; i < readings.length; i++) {
          const prevReading = readings[i - 1];
          const currentReading = readings[i];

          // Skip if the battery level increased (indicating a charge)
          if (currentReading.batteryLevel >= prevReading.batteryLevel) {
            continue;
          }

          const timeDiff = this.getTimeDifferenceInHours(prevReading.timestamp, currentReading.timestamp);
          const batteryDiff = prevReading.batteryLevel - currentReading.batteryLevel;

          totalUsage += batteryDiff;
          totalTime += timeDiff;
        }

        // Skip devices with insufficient data
        if (totalTime === 0) {
          continue;
        }

        const averageDailyUsage = (totalUsage / totalTime) * 24;

        if (averageDailyUsage > 0.3) {
          devicesNeedingReplacement.push(serialNumber);
        }
      }

      return devicesNeedingReplacement;
    },
    checkBatteries() {
      this.devicesNeedingReplacement = this.processBatteryData(batteryData);
    }
  }
};
</script>

<style scoped>
/* Add your styles here */
</style>


