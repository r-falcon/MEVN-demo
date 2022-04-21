<template>
  <div :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import echarts from "echarts";
require("echarts/theme/macarons"); // echarts theme
import resize from "./mixins/resize";
import { getAtrans } from "@/api/analysis";

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
    autoResize: {
      type: Boolean,
      default: true,
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
      getAtrans().then((res) => {
        const { title, xData, yData } = res.data;
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
          xAxis: {
            data: xData,
            boundaryGap: false,
            axisTick: {
              show: false,
            },
          },
          grid: {
            left: 10,
            right: 10,
            bottom: 20,
            top: 30,
            containLabel: true,
          },
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "cross",
            },
            padding: [5, 10],
          },
          yAxis: {
            axisTick: {
              show: false,
            },
          },
          legend: {
            data: ["购买数量"],
          },
          series: [
            {
              name: "购买数量",
              itemStyle: {
                normal: {
                  color: "#3888fa",
                  lineStyle: {
                    color: "#3888fa",
                    width: 2,
                  },
                },
              },
              type: "line",
              smooth: false,
              data: yData,
              animationDuration: 2800,
              animationEasing: "cubicInOut",
            },
          ],
        });
      });
    },
  },
};
</script>
