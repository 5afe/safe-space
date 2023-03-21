import React, { useState } from 'react'
import CreateTransaction from './CreateTransaction'
import ReviewTransactions from './ReviewTransactions';

function TransactionManagement() {

  const steps = [
    {
      name: 'create',
      component: <CreateTransaction />,
    },
    {
      name: 'review',
      component: <ReviewTransactions />
    },
  ]
  const [defaultTab, setDefaultTab] = useState<'create' | 'review' | 'execute'>('create');

  return (
    <div className='TransactionManagement container card shadow my-5 p-5'>
        <h1 className='text-center mb-3'>
                Manage Transactions
        </h1>
        <ul className="nav nav-tabs" id="popupTab" role="tablist">
          {steps.map((step, index) => {
            return (
              <li className="nav-item" role="presentation" key={index}>
                <button className={`nav-link ${defaultTab === step.name ? 'active': ''}`} id={`${step.name}-tab`} data-bs-toggle="tab" data-bs-target={`#${step.name}`} type="button" role="tab" aria-controls={step.name} aria-selected="true" onClick={() => setDefaultTab(step.name as any)}>
                  {step.name}
                </button>
              </li>
            )
          })
          }
        </ul>
        <div className="p-3 tab-content" id="popupTabContent">
          {steps.map((step, index) => {
            return (
              <div className={`tab-pane fade ${defaultTab === step.name ? 'show active': ''}`} id={step.name} role="tabpanel" aria-labelledby={`${step.name}-tab`} key={index}>
                {step.component}
              </div>
            )
          })
          }
        </div>
    </div>
  )
}

export default TransactionManagement