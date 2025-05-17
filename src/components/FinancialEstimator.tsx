import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip as ChartTooltip, Legend } from 'chart.js';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Register Chart.js components
ChartJS.register(ArcElement, ChartTooltip, Legend);

// Constants from the Google Sheet
const CONSTANTS = {
  REVENUE_PER_STUDENT: 15000,
  MISC_EXPENSES: 1500, // per student
  REAL_ESTATE_COSTS: {
    SUBURBAN: 3000, // per student
    RURAL: 2000, // per student
  },
  STRATA_BASE_FEE: 3000, // per student
  STRATA_NETWORK_REFERRAL_COST: 3000 // per referred student
};

interface FinancialEstimatorProps {
  className?: string;
}

const FinancialEstimator: React.FC<FinancialEstimatorProps> = ({ className }) => {
  // State for form inputs
  const [numStudents, setNumStudents] = useState(20);
  const [location, setLocation] = useState('RURAL');
  const [strataNetworkReferrals, setStrataNetworkReferrals] = useState(0);
  const [revenuePerStudent, setRevenuePerStudent] = useState(CONSTANTS.REVENUE_PER_STUDENT);

  // Calculated values
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalVariableCosts, setTotalVariableCosts] = useState(0);
  const [totalFixedCosts, setTotalFixedCosts] = useState(0);
  const [totalStrataCosts, setTotalStrataCosts] = useState(0);
  const [netProfit, setNetProfit] = useState(0);
  const [profitMarginPct, setProfitMarginPct] = useState(0);

  // Calculate all financial metrics
  useEffect(() => {
    const calcTotalRevenue = revenuePerStudent * numStudents;
    
    // Calculate all costs
    const realEstateCost = CONSTANTS.REAL_ESTATE_COSTS[location as keyof typeof CONSTANTS.REAL_ESTATE_COSTS] * numStudents;
    const miscExpenses = CONSTANTS.MISC_EXPENSES * numStudents;
    const strataBaseFee = CONSTANTS.STRATA_BASE_FEE * numStudents;
    const strataReferralFee = CONSTANTS.STRATA_NETWORK_REFERRAL_COST * strataNetworkReferrals;
    
    const totalCosts = realEstateCost + miscExpenses + strataBaseFee + strataReferralFee;
    const calcNetProfit = calcTotalRevenue - totalCosts;
    const calcProfitMargin = (calcNetProfit / calcTotalRevenue) * 100;

    setTotalRevenue(calcTotalRevenue);
    setTotalVariableCosts(totalCosts);
    setTotalFixedCosts(0);
    setTotalStrataCosts(0);
    setNetProfit(calcNetProfit);
    setProfitMarginPct(calcProfitMargin);
  }, [numStudents, location, strataNetworkReferrals, revenuePerStudent]);

  // Chart data
  const chartData = {
    labels: [
      'Net Profit',
      'Costs Estimate'
    ],
    datasets: [
      {
        data: [netProfit, totalVariableCosts + totalFixedCosts],
        backgroundColor: [
          'rgb(34, 197, 94)', // Green for profit
          'rgb(100, 116, 139)', // Slate-500 for costs
        ],
        borderColor: [
          'rgb(21, 128, 61)',
          'rgb(71, 85, 105)',
        ],
        borderWidth: 1
      }
    ]
  };

  return (
    <div className={`bg-black/50 p-8 rounded-lg border border-white/10 ${className}`}>
      <div className="grid md:grid-cols-2 gap-8">
        {/* Left Column - Inputs */}
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-white mb-6">Calculate Your Profit</h3>
          
          {/* Location Input */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Location Type
            </label>
            <select 
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-2 text-white"
            >
              <option value="SUBURBAN">Suburban</option>
              <option value="RURAL">Rural</option>
            </select>
            <p className="text-xs text-gray-400 mt-1">
              Real estate cost per student: ${CONSTANTS.REAL_ESTATE_COSTS[location as keyof typeof CONSTANTS.REAL_ESTATE_COSTS].toLocaleString()}/year
            </p>
          </div>

          {/* Number of Students Slider */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Number of Students
            </label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="10"
                max="30"
                value={numStudents}
                onChange={(e) => setNumStudents(parseInt(e.target.value))}
                className="flex-1"
              />
              <Input
                type="number"
                min="10"
                max="30"
                value={numStudents}
                onChange={(e) => setNumStudents(parseInt(e.target.value))}
                className="w-20 bg-black/50 border-white/20 text-white"
              />
            </div>
          </div>

          {/* Revenue per Student Input */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Revenue per Student (annual)
            </label>
            <Input
              type="number"
              value={revenuePerStudent}
              onChange={(e) => setRevenuePerStudent(parseInt(e.target.value))}
              className="bg-black/50 border-white/20 text-white"
            />
          </div>

          {/* Strata Network Referrals - temporarily hidden */}
          {/* <div>
            <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
              Strata Referrals
              <TooltipProvider delayDuration={0}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-white/10 text-xs cursor-pointer hover:bg-white/20 transition-colors">
                      i
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="right" className="bg-black/90 text-white border border-white/20 p-3">
                    <p className="w-[200px] text-sm">
                      # of students Strata finds for you vs. students you find directly. We only recruit students for you if ask want us to.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </label>
            <Input
              type="number"
              value={strataNetworkReferrals}
              onChange={(e) => setStrataNetworkReferrals(parseInt(e.target.value))}
              className="bg-black/50 border-white/20 text-white"
            />
          </div> */}

          {/* Reset Button */}
          <Button
            onClick={() => {
              setNumStudents(20);
                              setStrataNetworkReferrals(0);
              setLocation('RURAL');
              setRevenuePerStudent(CONSTANTS.REVENUE_PER_STUDENT);
            }}
            className="w-full bg-white/10 hover:bg-white/20 text-white"
          >
            Reset to Defaults
          </Button>
        </div>

        {/* Right Column - Results */}
        <div className="space-y-6">
          <div className="text-center">
            <h4 className="text-lg text-gray-300 mb-2">Your Estimated Annual Net Profit</h4>
            <div className="text-4xl font-bold text-green-500">
              ${netProfit.toLocaleString()}
            </div>
          </div>

          {/* Chart */}
          <div className="aspect-square max-w-[300px] mx-auto">
            <Doughnut 
              data={chartData}
              options={{
                plugins: {
                  legend: {
                    position: 'bottom',
                    labels: {
                      color: 'white'
                    }
                  },
                  tooltip: {
                    callbacks: {
                      label: function(context) {
                        const value = context.raw as number;
                        return `$${value.toLocaleString()}`;
                      }
                    }
                  }
                }
              }}
            />
          </div>

          {/* Breakdown Table */}
          <div className="mt-6">
            <h4 className="text-lg font-medium text-white mb-4">Financial Breakdown</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-gray-300">
                <span>Gross Revenue</span>
                <span>${totalRevenue.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Costs Estimate (Real Estate, Academic Software, Insurance, Equipment)</span>
                <span className="text-slate-400">-${(totalVariableCosts + totalFixedCosts).toLocaleString()}</span>
              </div>
              <div className="border-t border-white/10 pt-2 flex justify-between font-medium">
                <span className="text-white">Net Profit</span>
                <span className="text-green-500">${netProfit.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialEstimator; 