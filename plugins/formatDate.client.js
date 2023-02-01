export default defineNuxtPlugin(nuxtApp => {
  return {
    provide: {
      formatDate: date => {
        var d = new Date(date);
        var month = "" + (d.getMonth() + 1);
        var day = "" + d.getDate();
        var year = d.getFullYear();
        if (month.length < 2) month = "0" + month;
        if (day.length < 2) day = "0" + day;
        var output = [day, month, year].join("-");
        return output;
      },
    },
  };
});
