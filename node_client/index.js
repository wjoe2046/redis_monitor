//node program that cpatures local performance data and sends it up to the socket.io server

const os = require('os');

const performanceData = () => {
  return new Promise(async (resolve, reject) => {
    const cpus = os.cpus();
    // - CPU Load (Current)
    // - Memory Usage
    //     - free
    const freeMem = os.freemem();
    //     - total
    const totalMem = os.totalmem();
    const usedMem = totalMem - freeMem;
    const memUsage = Math.floor((usedMem / totalMem) * 100) / 100;

    // - OS Type
    const osType = os.type() == 'Darwin' ? 'Mac' : os.type();

    // - UP Time
    const upTime = os.uptime();

    // - CPU Info
    //     - Type
    const cpuModel = cpus[0].model;
    //     - Number of Cores
    const numCores = cpus.length;
    //     - Clock Speed
    const cpuSpeed = cpus[0].speed;

    const cpuLoad = await getCpuLoad();

    resolve({
      freeMem,
      totalMem,
      usedMem,
      memUsage,
      osType,
      upTime,
      cpuModel,
      numCores,
      cpuSpeed,
      cpuLoad,
    });
  });
};
//cpus is all numcores, we need the average of all the cores which will give us the cpu average

const cpuAverage = () => {
  const cpus = os.cpus();
  //get ms in each mode, but this number is since reboot
  let idleMs = 0;
  let totalMs = 0;
  cpus.forEach((core) => {
    //loop through each property of the current core
    for (type in core.times) {
      totalMs += core.times[type];
    }
    idleMs += core.times.idle;
  });

  return {
    idle: idleMs / cpus.length,
    total: totalMs / cpus.length,
  };
};

//because the times property is time since boot; we will get now times, and 100ms from now times. Compare them, that will give us current load

const getCpuLoad = () => {
  return new Promise((resolve, reject) => {
    const start = cpuAverage();
    setTimeout(() => {
      const end = cpuAverage();
      const idleDifference = end.idle - start.idle;
      const totalDifference = end.total - start.total;
      // console.log(idleDifference, totalDifference);
      //calculate the perctenage of used CPU
      const percentageCpu =
        100 - Math.floor((100 * idleDifference) / totalDifference);

      resolve(percentageCpu);
    }, 100);
  });
};

performanceData().then((allPerformanceData) => console.log(allPerformanceData));
