import React from 'react';
import { CalculatorInputs, CalculatorResults as ResultsType } from '../../types';
import { CalculatorForm } from './CalculatorForm';
import { CalculatorResults } from './CalculatorResults';
import { FeeBreakdown } from './FeeBreakdown';

interface CalculatorComponentProps {
  inputs: CalculatorInputs;
  results: ResultsType;
  onUpdateInput: <K extends keyof CalculatorInputs>(key: K, value: CalculatorInputs[K]) => void;
  onSetInputs: React.Dispatch<React.SetStateAction<CalculatorInputs>>;
  onNavigate?: (path: string) => void;
}

export const Calculator: React.FC<CalculatorComponentProps> = ({
  inputs,
  results,
  onUpdateInput,
  onSetInputs,
  onNavigate,
}) => {
  return (
    <div id="interactive-calculator" className="calculator-grid">
      <div className="calc-left-col">
        <CalculatorForm
          inputs={inputs}
          onUpdateInput={onUpdateInput}
          onSetInputs={onSetInputs}
        />
        <FeeBreakdown inputs={inputs} results={results} />
      </div>

      <div className="calc-right-col">
        <CalculatorResults
          inputs={inputs}
          results={results}
          onNavigate={onNavigate}
        />
      </div>
    </div>
  );
};
