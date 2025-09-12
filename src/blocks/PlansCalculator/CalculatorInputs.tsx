"use client"
import { PLANS } from "./constants";
import { Input, Select, SelectItem } from "@heroui/react";
import { FC } from "react";
import { Plans, Products } from "./types";
import { formatNumberWithCommas } from "@/utilities/formatNumberWithCommas";

type Props = {
  plan: Plans;
  product: Products;
  age: string;
  startAmount: string;
  currentTerm: string;
  additional: string;
  additionalFrecuency: "monthly" | "quarterly" | "semiannual";
  setStartAmount: (value: string) => void;
  setAge: (value: string) => void;
  setCurrentTerm: (value: string) => void;
  setAdditional: (value: string) => void;
  setAdditionalFrecuency: (
    value: "monthly" | "quarterly" | "semiannual"
  ) => void;
};

const CalculatorInputs: FC<Props> = ({
  plan: selectedPlan,
  product: selectedProduct,
  age,
  setAge,
  currentTerm,
  startAmount,
  additional,
  additionalFrecuency,
  setStartAmount,
  setCurrentTerm,
  setAdditional,
  setAdditionalFrecuency,
}) => {
  const findplan = PLANS[selectedPlan].find(
    (r: any) => r.key == selectedProduct
  )!;

  if (selectedProduct == "regent") {
    return (
      <>
        <div className="flex flex-col gap-2">
          <span className="font-bold text-xl">Initial amount</span>
          <Select
            aria-label="Initial amount"
            size="lg"
            selectedKeys={[startAmount]}
            disallowEmptySelection
            isRequired
            onSelectionChange={(value) => {
              if (value.currentKey == "10000") {
                setCurrentTerm("60m");
              }
              if (value.currentKey == "12000") {
                setCurrentTerm("48m");
              }
              if (value.currentKey == "15000") {
                setCurrentTerm("36m");
              }
              if (value.currentKey == "18000") {
                setCurrentTerm("24m");
              }
              setStartAmount(value.currentKey as string);
            }}
          >
            <SelectItem aria-label="10000" key="10000">
              10,000 USD
            </SelectItem>
            <SelectItem aria-label="12000" key="12000">
              12,000 USD
            </SelectItem>
            <SelectItem aria-label="15000" key="15000">
              15,000 USD
            </SelectItem>
            <SelectItem aria-label="18000" key="18000">
              18,000 USD
            </SelectItem>
          </Select>
        </div>
        <div className="flex flex-col gap-2">
          <span className="font-bold text-xl">Terms</span>
          <Select
            aria-label="Plazo"
            size="lg"
            selectedKeys={[currentTerm]}
            disallowEmptySelection
            isRequired
            isDisabled
          >
            <SelectItem aria-label="24 months" key="24m">
              24 months
            </SelectItem>
            <SelectItem aria-label="36 months" key="36m">
              36 months
            </SelectItem>
            <SelectItem aria-label="48 months" key="48m">
              48 months
            </SelectItem>
            <SelectItem aria-label="60 months" key="60m">
              60 months
            </SelectItem>
          </Select>
        </div>
      </>
    );
  }

  if (selectedProduct == "stJames") {
    return (
      <>
        <div className="flex flex-col gap-2">
          <span className="font-bold text-xl">Initial amount</span>
          <Input
            aria-label="Monto inicial"
            variant="faded"
            size="lg"
            startContent={<span>$</span>}
            endContent={<span>USD</span>}
            value={startAmount}
            onChange={(e) => setStartAmount(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <span className="font-bold text-xl">Terms</span>
          <Select
            aria-label="Plazo"
            size="lg"
            selectedKeys={[currentTerm]}
            disallowEmptySelection
            isRequired
            onSelectionChange={(value) => {
              setCurrentTerm(value.currentKey as string);
            }}
          >
            <SelectItem aria-label="24 months" key="24m">
              24 months
            </SelectItem>
            <SelectItem aria-label="36 months" key="36m">
              36 months
            </SelectItem>
          </Select>
        </div>
        {/** ADICIONAL */}
        <hr />
        <div className="flex flex-col gap-2">
          <span className="font-bold text-xl">Additonal deposits</span>
          <Input
            aria-label="Addiconal deposits"
            variant="faded"
            size="lg"
            startContent={<span>$</span>}
            endContent={<span>USD</span>}
            value={additional}
            onChange={(e) => setAdditional(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <span className="font-bold text-xl">Frecuency</span>
          <Select
            aria-label="Frecuency"
            size="lg"
            selectedKeys={[additionalFrecuency]}
            disallowEmptySelection
            isRequired
            onSelectionChange={(keys: any) => {
              setAdditionalFrecuency(Array.from(keys)[0] as any);
            }}
          >
            <SelectItem aria-label="monthly" key="monthly">
              Monthly
            </SelectItem>
            <SelectItem aria-label="quarterly" key="quarterly">
              Every 3 months
            </SelectItem>
            <SelectItem aria-label="semiannual" key="semiannual">
              Every 6 months
            </SelectItem>
          </Select>
        </div>
      </>
    );
  }

  if (selectedProduct == "lindenwood") {
    return (
      <>
        <div className="flex flex-col gap-2">
          <span className="font-bold text-xl">Initial amount</span>
          <Input
            aria-label="Monto inicial"
            variant="faded"
            size="lg"
            startContent={<span>$</span>}
            endContent={<span>USD</span>}
            value={startAmount}
            onChange={(e) => setStartAmount(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <span className="font-bold text-xl">Terms</span>
          <Select
            aria-label="Terms"
            size="lg"
            selectedKeys={[currentTerm]}
            disallowEmptySelection
            isRequired
            isDisabled
            onSelectionChange={(value) => {
              setCurrentTerm(value.currentKey as string);
            }}
          >
            <SelectItem aria-label="18 months" key="18m">
              18 months
            </SelectItem>
          </Select>
        </div>
        {/** ADICIONAL */}
        <hr />
        <div className="flex flex-col gap-2">
          <span className="font-bold text-xl">Additonal deposits</span>
          <Input
            aria-label="Addiconal deposits"
            variant="faded"
            size="lg"
            startContent={<span>$</span>}
            endContent={<span>USD</span>}
            value={additional}
            onChange={(e) => setAdditional(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <span className="font-bold text-xl">Frecuency</span>
          <Select
            aria-label="Frecuency"
            size="lg"
            selectedKeys={[additionalFrecuency]}
            disallowEmptySelection
            isRequired
            onSelectionChange={(keys: any) => {
              setAdditionalFrecuency(Array.from(keys)[0] as any);
            }}
          >
            <SelectItem aria-label="monthly" key="monthly">
              Monthly
            </SelectItem>
            <SelectItem aria-label="quarterly" key="quarterly">
              Every 3 months
            </SelectItem>
            <SelectItem aria-label="semiannual" key="semiannual">
              Every 6 months
            </SelectItem>
          </Select>
        </div>
      </>
    );
  }

  return (
    <>
      {selectedPlan != "retirement" &&
        selectedProduct !== "bridgewaterBusiness" && (
          <div className="flex flex-col gap-2 w-full">
            <span className="font-bold text-xl">Initial amount</span>
            <Input
              aria-label="Initial amount"
              variant="faded"
              size="lg"
              startContent={<span>$</span>}
              endContent={<span>USD</span>}
              value={startAmount}
              onChange={(e) => setStartAmount(e.target.value)}
              min={findplan?.min}
              max={findplan?.max}
            />
            {Number(startAmount || 0) < findplan?.min && (
              <span className="text-danger text-xs">Too low</span>
            )}
            {Number(startAmount || 0) > findplan?.max && (
              <span className="text-danger text-xs">Too high</span>
            )}
          </div>
        )}

      {(selectedPlan == "retirement" ||
        selectedProduct === "bridgewaterBusiness") && (
          <div className="flex flex-col gap-2 w-full">
            <span className="font-bold text-xl">Required amount</span>
            <Input
              aria-label="Required amount"
              variant="faded"
              size="lg"
              startContent={<span>$</span>}
              endContent={<span>USD</span>}
              value={formatNumberWithCommas(
                (
                  Object.keys(PLANS)
                    .map((key) => PLANS[key as Plans])
                    .flat()
                    .find((r) => r.key == selectedProduct) as any
                )?.investment?.toString() || ""
              )}
              disabled
            />
          </div>
        )}

      {selectedPlan == "retirement" && (
        <div className="flex flex-col gap-2 w-full">
          <span className="font-bold text-xl">Age</span>
          <Input
            aria-label="Edad"
            variant="faded"
            size="lg"
            endContent={<span>years</span>}
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
      )}

      {selectedPlan != "retirement" && (
        <div className="flex flex-col gap-2">
          <span className="font-bold text-xl">Terms</span>
          <Select
            aria-label="Plazo"
            size="lg"
            selectedKeys={["12m"]}
            disallowEmptySelection
            isRequired
            isDisabled
          >
            <SelectItem aria-label="12 months" key="12m">
              12 months
            </SelectItem>
          </Select>
        </div>
      )}

      {selectedProduct == "bridgewater" && (
        <>
          <hr />
          <div className="flex flex-col gap-2">
            <span className="font-bold text-xl">Additonal deposits</span>
            <Input
              aria-label="Addiconal deposits"
              variant="faded"
              size="lg"
              startContent={<span>$</span>}
              endContent={<span>USD</span>}
              value={additional}
              onChange={(e) => setAdditional(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-bold text-xl">Frecuency</span>
            <Select
              aria-label="Frecuency"
              size="lg"
              selectedKeys={[additionalFrecuency]}
              disallowEmptySelection
              isRequired
              onSelectionChange={(keys: any) => {
                setAdditionalFrecuency(Array.from(keys)[0] as any);
              }}
            >
              <SelectItem aria-label="monthly" key="monthly">
                Monthly
              </SelectItem>
              <SelectItem aria-label="quarterly" key="quarterly">
                Every 3 months
              </SelectItem>
              <SelectItem aria-label="semiannual" key="semiannual">
                Every 6 months
              </SelectItem>
            </Select>
          </div>
        </>
      )}
    </>
  );
};

export default CalculatorInputs;
