"use client"
/* eslint-disable react-hooks/exhaustive-deps */
import { PLANS } from "./constants";
import dayjs from "dayjs";
import * as echarts from "echarts";
import { FC, useEffect, useRef } from "react";
import { Plans, Products } from "./types";
import { formatNumberWithCommas } from "@/utilities/formatNumberWithCommas";

type DepositFrequency = "monthly" | "quarterly" | "semiannual";

type AdditionalAmount = {
  frecuency: DepositFrequency;
  amount: number;
};

type Props = {
  plan: Plans;
  product: Products;
  amount: number;
  age?: number;
  currentTerm: string;
  additional?: AdditionalAmount;
  showCapital: boolean;
};

const calcSP500 = (
  initialAmount: number,
  months: number,
  showCapital: boolean,
  depositFrequency: DepositFrequency = "monthly",
  depositAmount: number = 0
): number[] => {
  const annualRate = 0.15; // 15% anual promedio SP500
  const monthlyRate = annualRate / 12;
  const resultados: number[] = [];

  let currentValue = initialAmount; // saldo total (capital + ganancias)
  let totalContributed = initialAmount; // capital aportado

  // Convertimos la frecuencia a meses
  const depositInterval =
    depositFrequency === "monthly"
      ? 1
      : depositFrequency === "quarterly"
        ? 3
        : 6;

  for (let month = 1; month <= months; month++) {
    /* 1. Interés del mes */
    currentValue *= 1 + monthlyRate;

    /* 2. Depósito según la frecuencia */
    if (depositAmount > 0 && month > 1 && (month - 1) % depositInterval === 0) {
      currentValue += depositAmount;
      totalContributed += depositAmount;
    }

    /* 3. Ganancia acumulada = saldo – capital aportado */
    const profitAccum = currentValue - totalContributed;

    /* 4. Elegimos qué valor devolver según el flag */
    const valorMes = showCapital ? currentValue : profitAccum;
    resultados.push(Number(valorMes.toFixed(2)));
  }

  return resultados;
};

function calcularCrecimientoMensual(
  producto: Products,
  montoInicial: number,
  showCapital: boolean,
  edad?: number,
  plazoMeses: number = 12,
  additional?: AdditionalAmount
) {
  let xAxis = new Array(12).fill(1).map((r, index) => `${index + 1}M`);

  let series: any[] = [];
  let tasaMensual = 0.0;
  let acumulado = 0;
  const monthlyDeposit = Number(additional || 0);

  switch (producto) {
    case "bridgewater": {
      let montoCalculo = montoInicial;
      tasaMensual = 0.2 / 12;

      const mesesDeposito =
        additional?.frecuency === "monthly"
          ? 1
          : additional?.frecuency === "quarterly"
            ? 3
            : 6;

      series[0] = {
        name: "S&P 500",
        type: "line",
        label: {
          show: true,
          position: "top",
          formatter: (params: any) => {
            if (params.dataIndex == 11)
              return "$" + formatNumberWithCommas(params.value, 2, "-", false);
            return "";
          },
        },
        data: calcSP500(
          montoInicial,
          12,
          showCapital,
          additional?.frecuency,
          additional?.amount
        ),
        itemStyle: {
          color: "#adaba3",
        },
      };

      series[1] = {
        name: "Bluecastle",
        type: "line",
        label: {
          show: true,
          position: "top",
          formatter: (params: any) => {
            if (params.dataIndex == 11)
              return "$" + formatNumberWithCommas(params.value, 2, "-", false);
            return "";
          },
        },
        data: [],
      };

      for (let i = 1; i <= 12; i++) {
        /* 1. Interés generado este mes */
        const interesMes = montoCalculo * tasaMensual;
        acumulado += interesMes;

        /* 2. Saldo total */
        const saldoMes = montoCalculo + acumulado;

        /* 3. Valor a graficar */
        const valorMes = showCapital ? saldoMes : acumulado;
        series[1].data!.push(parseFloat(valorMes.toFixed(2)));

        /* 4. Depósito adicional según el periodo */
        if (i % mesesDeposito === 0) {
          montoCalculo += Number(additional?.amount || 0);
        }
      }

      break;
    }

    case "bridgewaterPlus": {
      if (montoInicial < 31_000) {
        montoInicial = 31_000;
      }

      series[0] = {
        name: "S&P 500",
        type: "line",
        label: {
          show: true,
          position: "top",
          formatter: (params: any) => {
            if (params.dataIndex == 11)
              return "$" + formatNumberWithCommas(params.value, 2, "-", false);
            return "";
          },
        },
        data: calcSP500(montoInicial, 12, showCapital),
        itemStyle: {
          color: "#adaba3",
        },
      };

      series[1] = {
        name: "Bluecastle",
        type: "line",
        label: {
          show: true,
          position: "top",
          formatter: (params: any) => {
            if (params.dataIndex == 11)
              return "$" + formatNumberWithCommas(params.value, 2, "-", false);
            return "";
          },
        },
        data: [],
      };

      const tasaMensual = 0.0167; // 1.67 % mensual
      const mensualidad = montoInicial * tasaMensual; // interés fijo cada mes
      let acumulado = 0; // rendimiento acumulado

      for (let i = 1; i <= 12; i++) {
        acumulado += mensualidad; // sumamos la ganancia del mes

        /* Valor a graficar según el toggle */
        const valorMes = showCapital
          ? montoInicial + acumulado // saldo total: capital + intereses
          : acumulado; // solo intereses

        series[1].data!.push(parseFloat(valorMes.toFixed(2)));
      }
      break;
    }

    case "bridgewaterBusiness": {
      series[0] = {
        name: "S&P 500",
        type: "line",
        label: {
          show: true,
          position: "top",
          formatter: (params: any) => {
            if (params.dataIndex == 11)
              return "$" + formatNumberWithCommas(params.value, 2, "-", false);
            return "";
          },
        },
        data: calcSP500(montoInicial, 12, showCapital),
        itemStyle: {
          color: "#adaba3",
        },
      };

      series[1] = {
        name: "Bluecastle",
        type: "line",
        label: {
          show: true,
          position: "top",
          formatter: (params: any) => {
            if (params.dataIndex == 11)
              return "$" + formatNumberWithCommas(params.value, 2, "-", false);
            return "";
          },
        },
        data: [],
      };

      const mensualidad = 2_500; // ganancia (o depósito) fija del mes
      let acumulado = 0; // rendimiento acumulado

      for (let i = 1; i <= 12; i++) {
        acumulado += mensualidad; // sumamos la ganancia del mes

        // --- toggle: saldo total vs. solo rendimiento ---
        const valorMes = showCapital
          ? montoInicial + acumulado // capital + intereses
          : acumulado; // solo intereses

        series[1].data!.push(parseFloat(valorMes.toFixed(2)));
      }
      break;
    }

    case "regent": {
      xAxis = [];

      series[0] = {
        name: "S&P 500",
        type: "line",
        label: {
          show: true,
          position: "top",
          formatter: (params: any) => {
            if (params.dataIndex == plazoMeses - 1)
              return "$" + formatNumberWithCommas(params.value, 2, "-", false);
            return "";
          },
        },
        data: calcSP500(montoInicial, plazoMeses, showCapital),
        itemStyle: {
          color: "#adaba3",
        },
      };
      series[1] = {
        name: "Bluecastle",
        type: "line",
        label: {
          show: true,
          position: "top",
          formatter: (params: any) => {
            if (params.dataIndex == plazoMeses - 1)
              return "$" + formatNumberWithCommas(params.value, 2, "-", false);
            return "";
          },
        },
        data: [],
      };

      if (plazoMeses) {
        /* 1. Obtenemos el plan y los valores de rendimiento */
        const plan = PLANS.capitalization.find((r: any) => r.key === "regent")!;
        const totalEarn = (
          plan.terms![plazoMeses.toString() as keyof typeof plan.terms] as any
        )?.total as number;

        const profits = totalEarn - montoInicial; // ganancia total proyectada
        const byMonth = profits / plazoMeses; // ganancia lineal mensual
        let acumulado = 0; // ganancias acumuladas

        /* 2. Recorremos los meses */
        for (let i = 1; i <= plazoMeses; i++) {
          acumulado += byMonth; // sumamos la ganancia del mes

          /* --- toggle: saldo total vs. solo ganancias --- */
          const valorMes = showCapital
            ? montoInicial + acumulado // capital + ganancias
            : acumulado; // solo ganancias

          series[1].data!.push(parseFloat(valorMes.toFixed(2)));
          xAxis.push(`${i}M`);
        }
      }

      break;
    }

    case "stJames": {
      let tasaAnual = 0.2;
      acumulado = 0;

      if (plazoMeses == 24) {
        tasaAnual = 0.25;
      }
      if (plazoMeses == 36) {
        tasaAnual = 0.3;
      }

      const depositInterval =
        additional!.frecuency === "monthly"
          ? 1
          : additional!.frecuency === "quarterly"
            ? 3
            : 6;

      series[0] = {
        name: "S&P 500",
        type: "line",
        label: {
          show: true,
          position: "top",
          formatter: (params: any) => {
            if (params.dataIndex == plazoMeses - 1)
              return "$" + formatNumberWithCommas(params.value, 2, "-", false);
            return "";
          },
        },
        data: calcSP500(
          montoInicial,
          plazoMeses,
          showCapital,
          additional?.frecuency,
          additional?.amount
        ),
        itemStyle: {
          color: "#adaba3",
        },
      };
      series[1] = {
        name: "Bluecastle",
        type: "line",
        label: {
          show: true,
          position: "top",
          formatter: (params: any) => {
            if (params.dataIndex == plazoMeses - 1)
              return "$" + formatNumberWithCommas(params.value, 2, "-", false);
            return "";
          },
        },
        data: [],
      };

      xAxis = [];

      /* ---------- 2. Estructuras por bloque ---------- */
      const deposits: number[] = [montoInicial];
      const accrued: number[] = [0];
      let totalDeposited = montoInicial;
      let totalValue = montoInicial;

      /* ---------- 3. Iteración mes a mes ---------- */
      for (let m = 1; m <= plazoMeses; m++) {
        /* 3.a Interés del mes por bloque */
        let monthlyGain = 0;
        for (let k = 0; k < deposits.length; k++) {
          const interesMes = deposits[k] * (tasaAnual / 12);
          accrued[k] += interesMes;
          monthlyGain += interesMes;
        }

        /* 3.b Actualizamos valor total */
        totalValue += monthlyGain;

        /* 3.c Depósito según la frecuencia (sin contar mes 1) */
        if (
          additional!.amount > 0 &&
          m > 1 &&
          (m - 1) % depositInterval === 0
        ) {
          deposits.push(additional!.amount);
          accrued.push(0);
          totalDeposited += additional!.amount;
          totalValue += additional!.amount;
        }

        /* 3.d PUSH ← Capital o Ganancia acumulada */
        const profitAccum = showCapital
          ? totalValue
          : totalValue - totalDeposited;
        series[1].data!.push(+profitAccum.toFixed(2));

        /* 3.e Etiqueta eje X */
        xAxis.push(`${m}M`);

        /* 3.f Capitalización anual */
        if (m % 12 === 0) {
          for (let k = 0; k < deposits.length; k++) {
            deposits[k] += accrued[k];
            accrued[k] = 0;
          }
        }
      }
      break;
    }

    case "lindenwood": {
      xAxis = [];

      series[0] = {
        name: "S&P 500",
        type: "line",
        label: {
          show: true,
          position: "top",
          formatter: (params: any) => {
            if (params.dataIndex == plazoMeses - 1)
              return "$" + formatNumberWithCommas(params.value, 2, "-", false);
            return "";
          },
        },
        data: calcSP500(
          montoInicial,
          plazoMeses,
          showCapital,
          additional?.frecuency,
          additional?.amount
        ),
        itemStyle: {
          color: "#adaba3",
        },
      };

      series[1] = {
        name: "Bluecastle",
        type: "line",
        label: {
          show: true,
          position: "top",
          formatter: (params: any) => {
            if (params.dataIndex == plazoMeses - 1)
              return "$" + formatNumberWithCommas(params.value, 2, "-", false);
            return "";
          },
        },
        data: [],
      };

      // Determinar tasa mensual según el monto inicial
      let tasaMensual = 0;
      if (montoInicial >= 10_000 && montoInicial < 20_000) {
        tasaMensual = 0.22 / 12;
      } else if (montoInicial < 25_000) {
        tasaMensual = 0.24 / 12;
      } else {
        tasaMensual = 0.26 / 12;
      }

      const depositInterval =
        additional!.frecuency === "monthly"
          ? 1
          : additional!.frecuency === "quarterly"
            ? 3
            : 6;

      let principal = montoInicial; // Capital que genera intereses
      let interesesAnio = 0; // Intereses acumulados del año
      let totalDeposited = montoInicial; // Capital aportado hasta la fecha

      for (let m = 1; m <= plazoMeses; m++) {
        /* --- 1. Etiqueta del eje X ------------------------- */
        xAxis.push(`${m}M`);

        /* --- 2. Interés del mes ---------------------------- */
        const interesMes = principal * tasaMensual;
        interesesAnio += interesMes;

        /* --- 3. Depósito al final del mes (según frecuencia) */
        if (
          additional!.amount > 0 &&
          m > 1 &&
          (m - 1) % depositInterval === 0
        ) {
          principal += additional!.amount; // Empieza a rendir el próximo mes
          totalDeposited += additional!.amount;
        }

        /* --- 4. Cálculo del valor a graficar --------------- */
        const saldoTotal = principal + interesesAnio; // capital + intereses
        const gananciaAcumulada = saldoTotal - totalDeposited; // solo intereses
        const valorMes = showCapital ? saldoTotal : gananciaAcumulada;

        series[1].data!.push(parseFloat(valorMes.toFixed(2)));

        /* --- 5. Capitalización anual ----------------------- */
        if (m % 12 === 0) {
          principal += interesesAnio; // los intereses se suman al capital
          interesesAnio = 0; // reinicia intereses para el nuevo año
        }
      }

      break;
    }

    case "fortgarryPlatinum":
    case "fortgarryGold":
    case "fortgarrySilver":
    case "fortgarryLimited":
      if (!edad) break;
      let _edad = edad;
      if (edad < 24 || edad > 59) {
        _edad = 24;
      }

      xAxis = [];
      // yAxis se convierte en series
      series = new Array(12).fill(1).map((r, index) => ({
        name: dayjs()
          .startOf("year")
          .add(1, "day")
          .add(index, "month")
          .format("MMM"),
        data: [],
        type: "bar",
        stack: "total",
      }));

      for (let age = _edad + 6; age <= 65; age++) {
        const mensualidad =
          PLANS.retirement
            .find((r: any) => r.key == producto)
            ?.monthly.find((r: any) => r.age == age)?.usd || 0;

        for (let i = 0; i < 12; i++) {
          series[i].data!.push(Math.floor(mensualidad * 100) / 100);
        }
        xAxis.push(age.toString());
      }
      break;

    default:
      break;
  }

  return {
    xAxis,
    series,
  };
}

const CalculatorChart: FC<Props> = (props) => {
  const chartRef = useRef<HTMLDivElement>(null);

  const setOptions = () => {
    const newEcharts = echarts.getInstanceByDom(chartRef.current!);
    const myChart = newEcharts || echarts.init(chartRef.current);

    const months = props.currentTerm.endsWith("m")
      ? Number(props.currentTerm.slice(0, -1))
      : 0;

    const calcs = calcularCrecimientoMensual(
      props.product,
      props.amount,
      props.showCapital,
      props.age || 24,
      months,
      props.additional
    );

    const option = {
      grid: { containLabel: true, x: 0 },
      color: [
        "#1B3B6F",
        "#4169E1",
        "#0047AB",
        "#102542",
        "#3A5FCD",
        "#4682B4",
        "#3F00FF",
        "#007FFF",
        "#0F52BA",
        "#27408B",
        "#00008B",
        "#2C2F88",
      ],

      legend: {
        selectedMode: false,
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      yAxis: {
        type: "value",
        name: "profits",
        min: "dataMin",
      },
      xAxis: {
        name: "months",
        type: "category",
        data: calcs.xAxis,
      },
      series: calcs.series,
    };

    myChart.setOption(option as any);

    return () => {
      myChart.dispose();
    };
  };

  useEffect(() => {
    return setOptions();
  }, [
    props.amount,
    props.plan,
    props.product,
    props.age,
    props.currentTerm,
    props.additional,
    props.showCapital,
  ]);

  return (
    <div
      className="w-[100%] xl:min-h-[350px] xl:h-full pt-8"
      style={{ width: "100%", minHeight: "350px", height: "100%" }}
      ref={chartRef}
    ></div>
  );
};

export default CalculatorChart;
