import React from "react";
import styles from "./column.module.css";
import { ElementStates } from "../../../types/element-states";

interface ColumnProps {
  value: number;
  state?: ElementStates;
  extraClass?: string;
}

export const Column: React.FC<ColumnProps> = ({
  value,
  state = ElementStates.Default,
  extraClass = "",
}) => (
  <div className={`${styles.content} ${extraClass}`}>
    <div
      className={`${styles.column} ${styles[state]}`}
      style={{ height: (340 * value) / 100 || 1 }}
    />
    <p className={`text text_type_column text_color_input mt-3`}>{value}</p>
  </div>
);
