"use client"
import React, { useEffect, useState } from "react";

function EmiCalculator({price = 1000}) {
    const [values, setValues] = useState({
      carPrice: "",
      downPayment: "",
      loanTerm: "",
      interestRate: "",
    });
    const [loanAmount, setLoanAmount] = useState(price);
    const [monthlyPayment, setMonthlyPayment] = useState(null);
    const [totalInterest, setTotalInterest] = useState(null);
    const [totalAmount, setTotalAmount] = useState(null);
  
    const calculateEMI = useCallback(() => {
      const principal = values.carPrice - values.downPayment;
      const ratePerMonth = values.interestRate / 100 / 12;
      const numberOfPayments = values.loanTerm * 12;
  
      if (principal > 0 && ratePerMonth > 0 && numberOfPayments > 0) {
        const emi =
          (principal *
            ratePerMonth *
            Math.pow(1 + ratePerMonth, numberOfPayments)) /
          (Math.pow(1 + ratePerMonth, numberOfPayments) - 1);
        const totalPayment = emi * numberOfPayments;
  
        setMonthlyPayment(emi);
        setTotalAmount(totalPayment);
        setTotalInterest(totalPayment - principal);
      }
    }, [values]);
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setValues((prev) => ({
        ...prev,
        [name]: value ? parseFloat(value) : "",
      }));
    };
  
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 px-4 py-8 md:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white font-inter mb-8">
            Car Loan Calculator (USD)
          </h1>
  
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white font-inter mb-6">
                Loan Details
              </h2>
  
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-inter text-gray-900 dark:text-gray-200 mb-2">
                    Car Price (USD)
                  </label>
                  <input
                    type="number"
                    name="carPrice"
                    value={values.carPrice}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    placeholder="Enter car price"
                  />
                </div>
  
                <div>
                  <label className="block text-sm font-inter text-gray-900 dark:text-gray-200 mb-2">
                    Down Payment (USD)
                  </label>
                  <input
                    type="number"
                    name="downPayment"
                    value={values.downPayment}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    placeholder="Enter down payment"
                  />
                </div>
  
                <div>
                  <label className="block text-sm font-inter text-gray-900 dark:text-gray-200 mb-2">
                    Loan Term (Years)
                  </label>
                  <input
                    type="number"
                    name="loanTerm"
                    value={values.loanTerm}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    placeholder="Enter loan term"
                  />
                </div>
  
                <div>
                  <label className="block text-sm font-inter text-gray-900 dark:text-gray-200 mb-2">
                    Interest Rate (%)
                  </label>
                  <input
                    type="number"
                    name="interestRate"
                    value={values.interestRate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    placeholder="Enter interest rate"
                  />
                </div>
  
                <button
                  onClick={calculateEMI}
                  className="w-full bg-gray-900 hover:bg-gray-700 text-white font-inter py-2 px-4 rounded-md transition-colors"
                >
                  Calculate Payment
                </button>
              </div>
            </div>
  
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white font-inter mb-6">
                Payment Summary
              </h2>
  
              <div className="space-y-6">
                <div>
                  <p className="text-sm font-inter text-gray-700 dark:text-gray-300 mb-1">
                    Monthly Payment
                  </p>
                  <p className="text-3xl font-bold font-inter text-gray-900 dark:text-white">
                    {monthlyPayment ? `$${monthlyPayment.toFixed(2)}` : "-"}
                  </p>
                </div>
  
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex justify-between mb-2">
                    <p className="text-sm font-inter text-gray-700 dark:text-gray-300">
                      Principal Amount
                    </p>
                    <p className="text-sm font-inter text-gray-900 dark:text-white">
                      $
                      {values.carPrice
                        ? (values.carPrice - values.downPayment).toFixed(2)
                        : "-"}
                    </p>
                  </div>
  
                  <div className="flex justify-between mb-2">
                    <p className="text-sm font-inter text-gray-700 dark:text-gray-300">
                      Total Interest
                    </p>
                    <p className="text-sm font-inter text-gray-900 dark:text-white">
                      ${totalInterest ? totalInterest.toFixed(2) : "-"}
                    </p>
                  </div>
  
                  <div className="flex justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-sm font-inter text-gray-700 dark:text-gray-300">
                      Total Amount
                    </p>
                    <p className="text-sm font-bold font-inter text-gray-900 dark:text-white">
                      ${totalAmount ? totalAmount.toFixed(2) : "-"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  
  
  