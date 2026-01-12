import Image from "next/image";

interface CarouselItem {
  id: number;
  bgColor: string;
  icon: React.ReactNode;
  title: string;
  desc: string;
}

const techStackData: CarouselItem[] = [
  {
    id: 1,
    bgColor: "#3776AB",
    icon: <Image src="/images/python.png" alt="Python" width={80} height={80} className="object-contain" />,
    title: "Python",
    desc: "I'd be shocked if a data scientist didn't have python in their toolbelt. It's a general purpose programming language but it's great at automating tasks."
  },
  {
    id: 2,
    bgColor: "#11557C",
    icon: <Image src="/images/matplotlib.png" alt="MatPlotLib" width={80} height={80} className="object-contain" />,
    title: "MatPlotLib",
    desc: "Creates data visualizations and charts that make insights clear and actionable. Transforms numbers into visual stories."
  },
  {
    id: 3,
    bgColor: "#EE4C2C",
    icon: <Image src="/images/pytorch.svg" alt="PyTorch" width={80} height={80} className="object-contain" />,
    title: "PyTorch",
    desc: "Builds machine learning models for predictive analytics. Powers forecasting, customer segmentation, and pattern recognition."
  },
  {
    id: 4,
    bgColor: "#009688",
    icon: <Image src="/images/fastapi.svg" alt="FastAPI" width={80} height={80} className="object-contain" />,
    title: "FastAPI",
    desc: "Builds APIs to connect data systems and enable real-time access to insights. Connects your data to dashboards and applications."
  },
  {
    id: 5,
    bgColor: "#4479A1",
    icon: <Image src="/images/mysql.svg" alt="MySQL" width={80} height={80} className="object-contain" />,
    title: "MySQL",
    desc: "Database management for storing and querying business data. Ensures reliable access to sales records, customer information, and operational metrics."
  },
  {
    id: 6,
    bgColor: "#000000",
    icon: <Image src="/images/nextjs.svg" alt="Next.js" width={80} height={80} className="object-contain" />,
    title: "Next.js",
    desc: "Powers web applications and interactive dashboards. Delivers fast, responsive interfaces for viewing and exploring data."
  },
  {
    id: 7,
    bgColor: "#06B6D4",
    icon: <Image src="/images/tailwind.svg" alt="Tailwind CSS" width={80} height={80} className="object-contain" />,
    title: "Tailwind",
    desc: "Enables modern, responsive design for dashboards and web interfaces. Ensures data visualizations look great on any device."
  },
  {
    id: 8,
    bgColor: "#3178C6",
    icon: <Image src="/images/typescript.svg" alt="TypeScript" width={80} height={80} className="object-contain" />,
    title: "TypeScript",
    desc: "Ensures reliable, maintainable code for web applications. Reduces errors and makes systems more robust."
  },
  {
    id: 9,
    bgColor: "#217346",
    icon: <Image src="/images/excel.svg" alt="Excel" width={80} height={80} className="object-contain" />,
    title: "Excel",
    desc: "Familiar business tool for data analysis and reporting. Works with your existing workflows and makes insights accessible."
  },
  {
    id: 10,
    bgColor: "#FF6384",
    icon: <Image src="/images/chartjs.svg" alt="Chart.js" width={80} height={80} className="object-contain" />,
    title: "Chart.js",
    desc: "Creates interactive charts and visualizations for dashboards. Makes data exploration intuitive and engaging."
  }
];

export default techStackData;
