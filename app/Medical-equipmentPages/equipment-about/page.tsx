"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown, ArrowLeft, Stethoscope, Clock, CheckCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface EquipmentItem {
  name: string;
  purpose: string;
  steps: string[];
  category: 'monitoring' | 'mobility' | 'respiratory' | 'general';
  urgency: 'routine' | 'critical' | 'emergency';
}

export default function EquipmentAboutPage() {
  const router = useRouter();
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const equipmentList: EquipmentItem[] = [
    {
      name: 'Digital Blood Pressure Monitor',
      purpose: 'To accurately measure and monitor systolic/diastolic blood pressure and pulse rate for cardiovascular assessment.',
      category: 'monitoring',
      urgency: 'routine',
      steps: [
        'Position the cuff snugly around the bare upper arm (2-3 cm above elbow)',
        'Sit upright with back supported, feet flat, and remain still',
        'Press the start button and avoid movement during measurement',
        'Wait for automatic inflation/deflation cycle completion (typically 30-60 seconds)',
        'Record the displayed readings and note time of measurement'
      ]
    },
    {
      name: 'Oxygen Concentrator',
      purpose: 'To deliver purified medical-grade oxygen to patients with hypoxemia or respiratory conditions.',
      category: 'respiratory',
      urgency: 'critical',
      steps: [
        'Place the unit on a stable surface with 6-inch clearance on all sides',
        'Connect the oxygen tubing to outlet port and nasal cannula/mask',
        'Power on the device and set prescribed flow rate (1-5 L/min typically)',
        'Verify oxygen flow by feeling air movement at cannula prongs',
        'Use continuously as directed by physician, monitoring for skin irritation'
      ]
    },
    {
      name: 'Manual Wheelchair',
      purpose: 'To provide independent mobility for individuals with walking impairments or recovery needs.',
      category: 'mobility',
      urgency: 'routine',
      steps: [
        'Engage both wheel locks before transferring into the chair',
        'Position feet on footrests and sit back completely in the seat',
        'Release wheel locks and grasp push rims at 10-2 o\'clock positions',
        'Push forward simultaneously with both hands to propel chair',
        'For turns, push one wheel while holding the other stationary'
      ]
    },
    {
      name: 'Hospital Bed',
      purpose: 'To provide safe patient positioning and facilitate medical care delivery.',
      category: 'general',
      urgency: 'routine',
      steps: [
        'Ensure all bed brakes are locked before patient transfer',
        'Use hand controls to adjust height for safe patient access',
        'Raise head section (30-45° for eating, 15-30° for resting)',
        'Adjust knee gatch if needed for patient comfort',
        'Engage side rails when unattended for fall prevention'
      ]
    },
    {
      name: 'Nebulizer Machine',
      purpose: 'To convert liquid medication into inhalable mist for respiratory treatment.',
      category: 'respiratory',
      urgency: 'critical',
      steps: [
        'Measure prescribed medication into the nebulizer cup',
        'Connect mouthpiece/mask and tubing to compressor',
        'Turn on the machine and breathe normally through mouthpiece',
        'Continue until all medication is aerosolized (typically 10-15 minutes)',
        'Disassemble and clean all parts after each use'
      ]
    },
    {
      name: 'Walking Frame',
      purpose: 'To provide stability and support during ambulation rehabilitation.',
      category: 'mobility',
      urgency: 'routine',
      steps: [
        'Adjust height so handgrips align with wrist crease when standing',
        'Position the frame slightly ahead while standing upright',
        'Grasp handles firmly and step forward into the frame',
        'Move frame forward again before taking next step',
        'Maintain upright posture without leaning on frame'
      ]
    },
    {
      name: 'CPAP Machine',
      purpose: 'To maintain open airways during sleep for obstructive sleep apnea treatment.',
      category: 'respiratory',
      urgency: 'critical',
      steps: [
        'Fill humidifier chamber with distilled water to indicated level',
        'Connect tubing to machine and properly fitted mask',
        'Put on mask and adjust straps for secure, comfortable seal',
        'Turn on device and breathe normally through nose/mouth',
        'Clean components daily and replace filters monthly'
      ]
    },
    {
      name: 'Multi Parameter Monitor',
      purpose: 'To continuously track vital signs including ECG, SpO2, and NIBP.',
      category: 'monitoring',
      urgency: 'emergency',
      steps: [
        'Connect appropriate sensors (ECG leads, SpO2 probe, BP cuff)',
        'Power on device and verify proper sensor placement',
        'Set alarm parameters as per patient condition',
        'Monitor displayed waveforms and numerical values',
        'Document trends and respond to alarm conditions'
      ]
    },
    {
      name: 'Electric Wheelchair',
      purpose: 'To provide powered mobility for individuals with limited upper body strength.',
      category: 'mobility',
      urgency: 'routine',
      steps: [
        'Ensure battery is fully charged before use',
        'Engage power switch and verify control responsiveness',
        'Use joystick to navigate (forward/backward with gentle movements)',
        'Reduce speed when turning or on uneven surfaces',
        'Park on level surface and turn off power when stationary'
      ]
    },
    {
      name: 'Syringe Pump',
      purpose: 'To deliver precise volumes of intravenous medication over time.',
      category: 'general',
      urgency: 'critical',
      steps: [
        'Load prepared medication syringe into pump holder',
        'Connect infusion line and prime to remove air bubbles',
        'Program infusion rate (mL/hr) and total volume',
        'Connect to patient IV access and start infusion',
        'Monitor site regularly and document infusion parameters'
      ]
    },
    {
      name: 'Portable Ventilator',
      purpose: 'To provide mechanical breathing support for respiratory failure.',
      category: 'respiratory',
      urgency: 'emergency',
      steps: [
        'Connect to oxygen source and check battery/power',
        'Set prescribed ventilation mode and parameters',
        'Attach circuit to patient airway (ET tube/tracheostomy)',
        'Initiate ventilation and monitor patient response',
        'Check alarms and circuit integrity hourly'
      ]
    },
    {
      name: 'Crutches Pair',
      purpose: 'To enable weight-bearing mobility during lower extremity recovery.',
      category: 'mobility',
      urgency: 'routine',
      steps: [
        'Adjust height so top is 2 finger-widths below armpit',
        'Position handgrips at wrist crease level when standing',
        'Move both crutches forward with injured leg',
        'Shift weight to hands and swing body forward',
        'Repeat sequence, maintaining upright posture'
      ]
    }
  ];

  const toggleExpand = (itemName: string) => {
    setExpandedItem(expandedItem === itemName ? null : itemName);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'monitoring': return <Stethoscope className="h-4 w-4" />;
      case 'mobility': return <ArrowLeft className="h-4 w-4 rotate-90" />;
      case 'respiratory': return <Clock className="h-4 w-4" />;
      default: return <CheckCircle className="h-4 w-4" />;
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'emergency': return 'bg-red-100 text-red-800 border-red-200';
      case 'critical': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-green-100 text-green-800 border-green-200';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'monitoring': return 'bg-blue-50 border-blue-200 hover:bg-blue-100';
      case 'mobility': return 'bg-purple-50 border-purple-200 hover:bg-purple-100';
      case 'respiratory': return 'bg-teal-50 border-teal-200 hover:bg-teal-100';
      default: return 'bg-gray-50 border-gray-200 hover:bg-gray-100';
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-indigo-100">
      <div className="max-w-md mx-auto bg-white min-h-screen shadow-xl relative">
        {/* Header with Back Button */}
        <div className="sticky top-0 bg-white z-20 border-b border-gray-200 px-4 py-4">
          <div className="flex items-center gap-3">
            <Button 
              onClick={() => router.push('/app/Medical-equipmentPages/medical-equipmentpage')}
              variant="ghost"
              size="sm"
              className="flex items-center gap-2 hover:bg-red-100 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <div className="flex-1">
              <h1 className="text-lg font-bold text-gray-900">
                Medical Equipment Guide
              </h1>
              <p className="text-sm text-gray-600">Step-by-step instructions</p>
            </div>
          </div>
        </div>
        
        <div className="p-4 space-y-4 pb-32">
          {equipmentList.map((item) => (
            <div 
              key={item.name} 
              className={`rounded-lg shadow-sm overflow-hidden border transition-all duration-300 ${getCategoryColor(item.category)} ${
                expandedItem === item.name ? 'ring-2 ring-blue-400 ring-opacity-30' : ''
              }`}
            >
              <button
                className="w-full p-4 flex justify-between items-center text-left transition-colors duration-200"
                onClick={() => toggleExpand(item.name)}
              >
                <div className="flex-1 pr-3">
                  <div className="flex items-center gap-2 mb-1">
                    {getCategoryIcon(item.category)}
                    <h2 className="text-base font-semibold text-gray-800">{item.name}</h2>
                  </div>
                  <div className="flex gap-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getUrgencyColor(item.urgency)}`}>
                      {item.urgency}
                    </span>
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-600">
                      {item.category}
                    </span>
                  </div>
                </div>
                <div className={`transition-transform duration-300 ${expandedItem === item.name ? 'rotate-180' : ''}`}>
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                </div>
              </button>
              
              <div className={`transition-all duration-300 ease-in-out overflow-hidden ${
                expandedItem === item.name ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <div className="px-4 pb-4 border-t border-gray-100">
                  <div className="bg-gray-50 rounded-lg p-3 mb-3 mt-3">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      <span className="font-semibold text-gray-900">Purpose:</span> {item.purpose}
                    </p>
                  </div>
                  
                  <h3 className="font-semibold mb-3 text-gray-900 text-sm flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Usage Process:
                  </h3>
                  <div className="space-y-2">
                    {item.steps.map((step, stepIndex) => (
                      <div 
                        key={stepIndex}
                        className="flex items-start gap-3 p-3 rounded-lg bg-white border border-gray-100"
                      >
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-semibold text-xs">
                          {stepIndex + 1}
                        </div>
                        <p className="text-sm text-gray-700 leading-relaxed flex-1">
                          {step}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}