export const projectEnglish = {
  "totem-pole-pfc": {
    title: "1kW Totem-Pole PFC",
    summary: "A flagship project for high power factor rectification, digital control, sampling robustness, and system efficiency.",
    status: "Debugging",
    tags: ["STM32G4", "PFC", "Digital Control", "High-Frequency Drive", "Closed-Loop Debugging"],
    metrics: [
      { label: "Power Target", value: "1kW" },
      { label: "Bus Target", value: "400V" },
      { label: "Platform", value: "STM32G4" }
    ],
    background:
      "This project demonstrates my integrated capability across topology understanding, sampling design, digital control, and system debugging.",
    role: [
      "Planned the system architecture and control structure",
      "Implemented sampling, protection, state machine, and interrupt-based control code",
      "Participated in parameter tuning, issue diagnosis, and iterative debugging"
    ],
    indicators: ["High PF target", "Low THD target", "Bus regulation", "Efficiency and thermal optimization"],
    designPoints: [
      "Separated sampling, protection, state machine, and modulation paths",
      "Optimized zero-crossing behavior, dead time, ADC triggering, and sampling consistency",
      "Kept the software structure maintainable for future parameter experiments"
    ],
    verification: [
      "Validated sampling, PWM, and protection at low voltage first",
      "Gradually increased power while observing waveforms, bus stability, and temperature",
      "Planned quantitative PF, THD, efficiency, and thermal records"
    ],
    issues: [
      "The ISR budget becomes tight under high-frequency control",
      "Zero-crossing distortion and sampling noise can affect PF and THD",
      "Hardware and software protection coordination needs continuous refinement"
    ],
    nextSteps: ["Add full performance tables", "Improve robustness", "Turn the project into a clearer engineering document"],
    diagramTitle: "PFC System Diagram",
    schematicTitle: "Key Schematic Area",
    hardwareTitle: "PCB / Hardware Photos",
    waveformTitle: "Debug Waveforms"
  },
  "isolated-sampling-board": {
    title: "AC/DC Isolated Voltage and Current Sampling Board",
    summary: "A front-end module for clean, isolated, and calibratable signals into the control system.",
    status: "PCB Ordered",
    tags: ["Isolated Sampling", "Signal Conditioning", "ADC Interface", "PCB", "Noise Immunity"],
    metrics: [
      { label: "Function", value: "AC / DC Sampling" },
      { label: "Value", value: "Reliable Measurement" },
      { label: "Use Case", value: "Control Front-End" }
    ],
    background:
      "The sampling board is the input foundation for power control projects, designed to reduce noise, scaling error, and later debugging complexity.",
    role: ["Defined the sampling scheme and interfaces", "Planned front-end conditioning and calibration", "Organized PCB constraints and isolation regions"],
    indicators: ["Scaling accuracy", "Noise immunity", "Reusable interface", "ADC compatibility"],
    designPoints: ["Focused on stable voltage and current scaling", "Separated isolation and layout regions clearly", "Matched the interface to MCU ADC ranges"],
    verification: ["Add static calibration curves", "Validate output consistency under different inputs", "Check noise immunity and grounding strategy"],
    issues: ["Analog front ends are sensitive to layout and return paths", "Unclear calibration methods reduce reuse value"],
    nextSteps: ["Build a unified calibration flow", "Add measured data", "Turn it into a reusable sampling module template"],
    diagramTitle: "Sampling Chain Diagram",
    schematicTitle: "Sampling Schematic",
    hardwareTitle: "PCB / Board Photos",
    waveformTitle: "Calibration and Scope Results"
  },
  "auxiliary-power-module": {
    title: "Competition Auxiliary Power Module",
    summary: "A support module that provides stable power rails for control, drive, and sampling boards.",
    status: "Soldered",
    tags: ["Auxiliary Supply", "Multi-Output", "Power Architecture", "System Integration"],
    metrics: [
      { label: "Role", value: "System Base" },
      { label: "Focus", value: "Stable Power" },
      { label: "Integration", value: "Multi-Board" }
    ],
    background:
      "The auxiliary supply is a quiet but essential part of the platform, determining whether control, sampling, and drive modules can operate reliably together.",
    role: ["Planned the auxiliary supply architecture", "Organized output requirements and interfaces", "Prepared system integration and debugging strategy"],
    indicators: ["Multi-output stability", "Ripple control", "Load compatibility", "System power margin"],
    designPoints: ["Planned voltage rails for different modules", "Balanced isolation, size, and output capability", "Kept interfaces consistent for reuse"],
    verification: ["Validate each output under no-load and load conditions", "Observe supply noise influence on control and sampling", "Add ripple and thermal records"],
    issues: ["Poor interface planning can spread problems across modules", "Limited margin makes later expansion harder"],
    nextSteps: ["Complete output data tables", "Add interface diagrams", "Document it as an independent module"],
    diagramTitle: "Auxiliary Power Diagram",
    schematicTitle: "Power Schematic",
    hardwareTitle: "Module Photo",
    waveformTitle: "Ripple and Test Results"
  },
  "stm32g4-control-board": {
    title: "STM32G4 Control Board",
    summary: "The MCU control core for power electronics applications, covering sampling, PWM, protection, and debugging interfaces.",
    status: "Verified",
    tags: ["STM32G4", "Control Board", "PWM", "ADC Trigger", "Protection Logic"],
    metrics: [
      { label: "MCU", value: "STM32G4" },
      { label: "Capability", value: "Real-Time Control" },
      { label: "Role", value: "Control Core" }
    ],
    background:
      "The control board is where hardware and software meet most directly, and it is an important reusable base for multiple power projects.",
    role: ["Planned control interfaces and MCU resources", "Implemented interrupts, PWM, ADC, and protection logic", "Optimized compute budget and software structure during debugging"],
    indicators: ["Timer resource usage", "ADC trigger consistency", "Protection response", "Debug interface completeness"],
    designPoints: ["Prioritized interrupts and peripherals around power control", "Clarified sampling, PWM, and protection timing", "Reserved debug and expansion interfaces"],
    verification: ["Validated peripheral coordination and fault response", "Observed PWM and ADC timing with waveforms", "Add interface and control flow diagrams later"],
    issues: ["Insufficient debug paths raise troubleshooting cost", "High-frequency control amplifies unclear timing and code structure"],
    nextSteps: ["Refine reusable control templates", "Add interface documentation", "Extract a more reusable software architecture"],
    diagramTitle: "Control Board Diagram",
    schematicTitle: "Key Peripheral Schematic",
    hardwareTitle: "Control Board PCB / Photo",
    waveformTitle: "PWM / ADC Timing"
  },
  "llc-or-mems": {
    title: "Half-Bridge LLC / MEMS Conditioning Circuit",
    summary: "A direction covering resonant converter control and analog signal conditioning capability.",
    status: "Designing",
    tags: ["LLC", "Resonant Converter", "Analog Conditioning", "Gate Timing", "Validation"],
    metrics: [
      { label: "Direction A", value: "Half-Bridge LLC" },
      { label: "Direction B", value: "MEMS Conditioning" },
      { label: "Focus", value: "Deep Research" }
    ],
    background:
      "This project group shows my extension into resonant conversion and analog signal chains, beyond only module assembly.",
    role: ["Analyzed theory and system structure", "Designed drive, control, or conditioning chains", "Planned validation paths and iteration direction"],
    indicators: ["Efficiency potential", "Resonant control understanding", "Analog front-end stability", "System extensibility"],
    designPoints: ["LLC focuses on frequency modulation, timing, and high-efficiency regions", "MEMS conditioning focuses on small-signal amplification and noise", "The two directions strengthen analog and power system thinking together"],
    verification: ["Add waveforms, debugging notes, and block diagrams", "Validate low-risk stages before increasing complexity"],
    issues: ["LLC control windows are narrow and parameter-sensitive", "MEMS front ends are sensitive to noise and layout"],
    nextSteps: ["Clarify primary and secondary display projects", "Add staged validation data", "Turn it into an independent topic page"],
    diagramTitle: "System Diagram",
    schematicTitle: "Key Design Schematic",
    hardwareTitle: "PCB / Hardware",
    waveformTitle: "Waveforms and Test Results"
  }
} as const;
