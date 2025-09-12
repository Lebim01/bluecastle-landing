"use client"
import Disclaimer from "@/components/Disclaimer";
import { PLANS } from "./constants";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import { FC } from "react";

function generateArrayInclusive(start: number, end: number) {
  const result = [];
  for (let i = start; i <= end; i++) {
    result.push(i);
  }
  return result;
}

type Props = {
  age: number;
  plan_id: string;
};

const CalculatorFortgarry: FC<Props> = (props) => {
  const ages = PLANS.retirement.find((r: any) => r.key == props.plan_id)!;

  return (
    <div className="p-0 md:p-4 h-full w-full">
      <span className="text-xs">Starting 6 years after init contract</span>
      <Table
        aria-label="Example static collection table"
        className="p-1 max-h-[350px]"
        isStriped
        isHeaderSticky
      >
        <TableHeader>
          <TableColumn>AGE</TableColumn>
          <TableColumn>%</TableColumn>
          <TableColumn>USD</TableColumn>
        </TableHeader>
        <TableBody>
          {generateArrayInclusive(props.age + 6, 65).map((age) => (
            <TableRow key={age}>
              <TableCell>{age}</TableCell>
              <TableCell>
                {ages?.monthly?.find((r: any) => r.age == age)?.percentage}
              </TableCell>
              <TableCell>
                {ages?.monthly?.find((r: any) => r.age == age)?.usd}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Disclaimer />
    </div>
  );
};

export default CalculatorFortgarry;
