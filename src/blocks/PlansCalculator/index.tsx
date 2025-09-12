"use client"
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { Tabs, Tab, Select, SelectItem, Switch } from "@heroui/react";
import { FC, useEffect, useState } from "react";
import CalculatorChart from "./CalculatorChart";
import { PLANS } from "./constants";
import CalculatorInputs from "./CalculatorInputs";
import { useTranslation } from "react-i18next";
import CalculatorFortgarry from "./CalculatorFortgarry";

import { Plans, Products } from "./types";
import Disclaimer from "@/components/Disclaimer";


type Props = {
  plans?: Plans;
  product?: Products;
};

const SimulatorSection: FC<Props> = () => {
  const [selectedPlan, setSelectedPlan] = useState<Plans>(
    "growth"
  );
  const [selectedProduct, setSelectedProduct] = useState<Products[]>([
    "bridgewater",
  ]);
  const [startAmount, setStartAmount] = useState("10000");
  const [age, setAge] = useState("24");
  const [currentTerm, setCurrentTerm] = useState("12m");
  const [additional, setAdditional] = useState("0");
  const [additionalFrecuency, setAdditionalFrecuency] = useState<
    "monthly" | "quarterly" | "semiannual"
  >("monthly");
  const [showCapital, setShowCapital] = useState(true);
  const i18n = useTranslation();

  useEffect(() => {
    const selected = PLANS[selectedPlan].find(
      (r: any) => r.key == selectedProduct[0]
    );

    if (selectedProduct[0].startsWith("bridgewater")) {
      setCurrentTerm("12m");
    }
    if (selectedProduct[0] == "stJames") {
      setCurrentTerm("24m");
    }
    if (selectedProduct[0] == "lindenwood") {
      setCurrentTerm("18m");
    }
    if (selectedProduct[0] == "regent") {
      setCurrentTerm("24m");
      setStartAmount("18000");
    }

    if (selected?.investment) {
      setStartAmount(selected?.investment.toString());
    }
  }, [selectedProduct]);

  useEffect(() => {
    setStartAmount(startAmount);
  }, [startAmount]);

  return (

    <div className="bg-white flex justify-center min-h-[50vh] overflow-hidden">
      <div className="relative flex flex-col items-start p-8 gap-8 w-full max-w-[1440px]">
        <div>
          <h3 className="text-3xl">
            {i18n.t("landing.simulator_section.select_goal")}
          </h3>
          <span className="text-gray-500">
            {i18n.t("landing.simulator_section.simulate_investment")}
          </span>
        </div>

        <Tabs
          aria-label="Plans"
          color={"primary"}
          radius="md"
          size="lg"
          onSelectionChange={(value) => {
            setSelectedPlan(value as Plans);
            setSelectedProduct([PLANS[value][0].key as Products]);
          }}
          selectedKey={selectedPlan}
          fullWidth
        >
          <Tab
            key="growth"
            title={i18n.t("landing.simulator_section.growth")}
          />
          <Tab
            key="capitalization"
            title={i18n.t("landing.simulator_section.capitalization")}
          />
          <Tab
            key="retirement"
            title={i18n.t("landing.simulator_section.retirement")}
          />
        </Tabs>

        <div className="flex flex-col md:flex-row gap-8 w-full">
          <div className="w-full flex flex-col gap-6 md:max-w-[30%]">
            <div className="flex flex-col gap-2 w-full">
              <span className="font-bold text-xl">
                {i18n.t("landing.simulator_section.financial_plan")}
              </span>
              <Select
                aria-label="Plan"
                selectedKeys={selectedProduct}
                onSelectionChange={(value) => {
                  if (value.currentKey == "bridgewater-plus") {
                    if (Number(startAmount) < 31000) {
                      setStartAmount("31000");
                    }
                  }
                  if (value.currentKey == "st-james") {
                    if (Number(startAmount) < 15000) {
                      setStartAmount("15000");
                      setCurrentTerm("24m");
                    }
                  }
                  if (value.currentKey == "regent") {
                    setStartAmount("10000");
                    setCurrentTerm("60m");
                  }
                  setSelectedProduct([value.currentKey as unknown as Products]);
                }}
                isRequired
                size="lg"
                disallowEmptySelection
                startContent={
                  <img
                    src="/public/icons/chess-rook-regular.svg"
                    alt="castle"
                    height={20}
                    width={20}
                  />
                }
              >
                {PLANS[selectedPlan].map(({ label, key }: any) => (
                  <SelectItem
                    aria-label={label}
                    key={key}
                    startContent={
                      <img
                        src="/public/icons/chess-rook-regular.svg"
                        alt="castle"
                        height={20}
                        width={20}
                      />
                    }
                  >
                    {label}
                  </SelectItem>
                ))}
              </Select>
            </div>

            <CalculatorInputs
              plan={selectedPlan}
              product={selectedProduct[0]}
              startAmount={startAmount}
              age={age}
              currentTerm={currentTerm}
              additional={additional}
              additionalFrecuency={additionalFrecuency}
              setStartAmount={setStartAmount}
              setAge={setAge}
              setCurrentTerm={setCurrentTerm}
              setAdditional={setAdditional}
              setAdditionalFrecuency={setAdditionalFrecuency}
            />
          </div>

          {selectedPlan != "retirement" && (
            <div className="w-full flex flex-col items-end flex-1">
              <div className="flex items-center gap-4">
                <span>Show initial capital</span>
                <Switch
                  defaultSelected
                  aria-label="Show initial capital"
                  onValueChange={setShowCapital}
                />
              </div>
              <CalculatorChart
                amount={Number(startAmount) || 0}
                plan={selectedPlan}
                product={selectedProduct[0]}
                age={age ? Number(age) || 24 : 24}
                currentTerm={currentTerm}
                additional={{
                  amount: Number(additional),
                  frecuency: additionalFrecuency,
                }}
                showCapital={showCapital}
              />

              <Disclaimer />
            </div>
          )}

          {selectedPlan == "retirement" && (
            <CalculatorFortgarry
              age={Number(age) || 0}
              plan_id={selectedProduct[0]}
            />
          )}
        </div>
      </div>
    </div>

  );
};

export default SimulatorSection;
