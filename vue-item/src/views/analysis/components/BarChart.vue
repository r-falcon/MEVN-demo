<template>
  <div :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import echarts from "echarts";
require("echarts/theme/macarons"); // echarts theme
import resize from "./mixins/resize";
import { getAbuys } from "@/api/analysis";

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
      getAbuys().then((res) => {
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
          grid: {
            left: "5%",
            right: "5%",
            top: "20%",
            bottom: "30%",
          },
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
            },
          },
          xAxis: [
            {
              type: "category",
              data: xData,
              axisLabel: {
                show: true,
                interval: 0,
                rotate: 45,
                textStyle: {
                  color: "#999",
                  fontSize: 15,
                },
              },
            },
          ],
          yAxis: [
            {
              type: "value",
              name: "采购数量",
              axisLabel: {
                formatter: "{value}",
              },
              axisLine: {
                lineStyle: { color: "#999" },
              },
              splitLine: {
                show: true,
                lineStyle: {
                  type: "solid",
                  color: "#eee",
                  opacity: 0.9,
                },
              },
            },
          ],
          series: [
            {
              type: "bar",
              name: "数量",
              barWidth: "28",
              data: yData,
              label: {
                normal: {
                  show: true,
                  position: "top",
                },
                formatter: "{@value}",
              },
              itemStyle: {
                // 条形图渐变
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                      offset: 0,
                      color: "#2ec7c9",
                    },
                    {
                      offset: 1,
                      color: "#2ec7c9",
                    },
                  ]),
                },
              },
            },
          ],
          color: ["#2ec7c9"],
        });
      });
    },
  },
};
</script>
