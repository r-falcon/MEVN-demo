<template>
  <div :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import echarts from "echarts";
require("echarts/theme/macarons"); // echarts theme
import resize from "./mixins/resize";
import { getAstores } from "@/api/analysis";

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: "chart",
    },
    width: {
      type: String,
      default: "100%",
    },
    height: {
      type: String,
      default: "300px",
    },
  },
  data() {
    return {
      chart: null,
    };
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val);
      },
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart();
    });
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, "macarons");
      this.setOptions();
    },

    setOptions() {
      getAstores().then((res) => {
        const { title, lengend, pieData } = res.data;
        this.chart.setOption({
          title: {
            text: title,
            textStyle: {
              align: "center",
              color: "#333333",
              fontSize: 16,
            },
            top: "0px",
            left: "20px",
          },
          tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b} : {c} ({d}%)",
          },
          legend: {
            left: "center",
            bottom: "10",
            data: lengend,
          },
          series: [
            {
              name: "库存数量占比",
              type: "pie",
              roseType: "radius",
              radius: [15, 95],
              center: ["50%", "38%"],
              data: pieData,
              animationEasing: "cubicInOut",
              animationDuration: 2600,
            },
          ],
        });
      });
    },
  },
};
</script>
