import jsPDF from "jspdf";
import kaffynLogo from "@/assets/kaffyn-logo.png";

const menuData = {
  hotCoffee: {
    title: "Hot Coffee",
    items: [
      { name: "Espresso", price: 160 },
      { name: "Macchiato", price: 170 },
      { name: "Caramel Macchiato", price: 200 },
      { name: "Latte", price: 200 },
      { name: "Vanilla Latte", price: 220 },
      { name: "Hazelnut Latte", price: 220 },
      { name: "Biscoff Latte", price: 240 },
      { name: "24k Gold Latte", price: 280 },
      { name: "Cortado", price: 200 },
      { name: "Flat White", price: 200 },
      { name: "Cappuccino", price: 200 },
      { name: "Mocha Cappuccino", price: 210 },
      { name: "White Mocha", price: 210 },
      { name: "Crème Brûlée Cappuccino", price: 220 },
      { name: "Irish Coffee", price: 200 },
      { name: "Americano", price: 190 },
    ],
  },
  icedCoffee: {
    title: "Iced Coffee",
    items: [
      { name: "Iced Latte Original", price: 190 },
      { name: "Iced Vanilla Latte", price: 210 },
      { name: "Iced Irish Cream Latte", price: 220 },
      { name: "Iced Caramel Latte", price: 220 },
      { name: "Iced Hazelnut Latte", price: 220 },
      { name: "Iced Mocha Latte", price: 230 },
      { name: "Iced Biscoff Latte", price: 270 },
      { name: "Iced Nutella Latte", price: 270 },
      { name: "Oat Milkshaken Espresso", price: 260 },
      { name: "Frappé Original", price: 210 },
      { name: "Mocha Frappé", price: 250 },
      { name: "Irish Frappé", price: 280 },
      { name: "KitKat Frappé", price: 270 },
      { name: "Hazelnut Frappé", price: 290 },
      { name: "Caramel Frappé", price: 290 },
      { name: "Oreo Chip Frappé", price: 290 },
      { name: "Choco Frappé", price: 310 },
      { name: "Biscoff Frappé", price: 320 },
      { name: "Nutella Frappé", price: 320 },
      { name: "Ferrero Rocher Frappé", price: 380 },
      { name: "Brownie Mocha Frappé", price: 380 },
    ],
  },
  manualBrew: {
    title: "Manual Brew",
    items: [
      { name: "Hot Pour Over", price: 200 },
      { name: "Cold Brew", price: 210 },
      { name: "Iced Pour Over Vanilla", price: 220 },
      { name: "Cold Brew Sweet Cream", price: 230 },
      { name: "Sparkling Cold Brew", price: 230 },
      { name: "Black Mamba", price: 240 },
      { name: "Iced Americano", price: 210 },
      { name: "Espresso Tonic", price: 270 },
      { name: "Cold Brew Tonic", price: 270 },
      { name: "Cranberry Espresso Tonic", price: 280 },
      { name: "Orange Brew Driver", price: 280 },
    ],
  },
  dessertCoffee: {
    title: "Dessert Coffee",
    items: [
      { name: "Affogato", price: 240 },
      { name: "Trifle Affogato", price: 330 },
      { name: "Vietnamese Coffee", price: 210 },
      { name: "Bombon", price: 210 },
    ],
  },
  notCoffee: {
    title: "Not Coffee",
    items: [
      { name: "Hot Chocolate Original", price: 200 },
      { name: "Cinnamon Hot Chocolate", price: 220 },
      { name: "Hazelnut Hot Chocolate", price: 240 },
      { name: "Belgian Hot Chocolate", price: 270 },
      { name: "Tea (Various Options)", price: 130 },
      { name: "Blooming Tea", price: 240 },
    ],
  },
  coolers: {
    title: "Coolers & Refreshers",
    items: [
      { name: "Pink Lemonade", price: 180 },
      { name: "Mojito", price: 190 },
      { name: "Blueberry Cooler", price: 230 },
      { name: "Iced Tea", price: 230 },
      { name: "Guava Colada", price: 230 },
      { name: "Sangria", price: 250 },
      { name: "Passion Breeze", price: 280 },
      { name: "Bliss On Peach", price: 280 },
      { name: "Lychee Lemon Candy", price: 300 },
    ],
  },
  desserts: {
    title: "Desserts",
    items: [
      { name: "Chocolate Cream", price: 260 },
      { name: "Biscoff Ice-cream Sandwich", price: 200 },
    ],
  },
};

export const generateMenuPdf = async () => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 15;
  const contentWidth = pageWidth - margin * 2;
  let y = margin;

  // Elegant color palette
  const darkBrown: [number, number, number] = [45, 35, 28];
  const warmGold: [number, number, number] = [180, 145, 90];
  const cream: [number, number, number] = [255, 252, 247];
  const softBrown: [number, number, number] = [120, 100, 80];

  // Page background with subtle texture effect
  doc.setFillColor(...cream);
  doc.rect(0, 0, pageWidth, pageHeight, "F");

  // Decorative border
  doc.setDrawColor(...warmGold);
  doc.setLineWidth(0.5);
  doc.rect(8, 8, pageWidth - 16, pageHeight - 16);
  doc.setLineWidth(0.2);
  doc.rect(10, 10, pageWidth - 20, pageHeight - 20);

  // Header area
  y = 20;

  // Load and add logo
  try {
    const img = new Image();
    img.crossOrigin = "anonymous";
    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = reject;
      img.src = kaffynLogo;
    });
    
    const logoSize = 28;
    doc.addImage(img, "PNG", (pageWidth - logoSize) / 2, y, logoSize, logoSize);
    y += logoSize + 5;
  } catch {
    doc.setTextColor(...darkBrown);
    doc.setFontSize(24);
    doc.setFont("times", "bold");
    doc.text("KAFFYN", pageWidth / 2, y + 15, { align: "center" });
    y += 25;
  }

  // Menu title (above the line)
  y += 5;
  doc.setTextColor(...darkBrown);
  doc.setFontSize(14);
  doc.setFont("times", "italic");
  doc.text("Menu", pageWidth / 2, y, { align: "center" });
  
  // Decorative line under menu title
  y += 6;
  doc.setDrawColor(...warmGold);
  doc.setLineWidth(0.3);
  const lineWidth = 40;
  doc.line((pageWidth - lineWidth) / 2, y, (pageWidth + lineWidth) / 2, y);
  
  y += 10;

  const categories = Object.values(menuData);
  const columnWidth = (contentWidth - 10) / 2;
  let currentColumn = 0;
  let columnX = margin;
  const startY = y;

  const addCategory = (category: { title: string; items: { name: string; price: number }[] }) => {
    const itemHeight = 6;
    const categoryHeight = 12 + category.items.length * itemHeight + 8;

    // Check if we need to switch columns or pages
    if (y + categoryHeight > pageHeight - 25) {
      if (currentColumn === 0) {
        currentColumn = 1;
        columnX = margin + columnWidth + 10;
        y = startY;
      } else {
        doc.addPage();
        doc.setFillColor(...cream);
        doc.rect(0, 0, pageWidth, pageHeight, "F");
        // Border on new page
        doc.setDrawColor(...warmGold);
        doc.setLineWidth(0.5);
        doc.rect(8, 8, pageWidth - 16, pageHeight - 16);
        doc.setLineWidth(0.2);
        doc.rect(10, 10, pageWidth - 20, pageHeight - 20);
        currentColumn = 0;
        columnX = margin;
        y = 20;
      }
    }

    // Category title with elegant underline
    doc.setTextColor(...darkBrown);
    doc.setFontSize(11);
    doc.setFont("times", "bold");
    doc.text(category.title, columnX, y);
    
    // Underline
    const titleWidth = doc.getTextWidth(category.title);
    doc.setDrawColor(...warmGold);
    doc.setLineWidth(0.4);
    doc.line(columnX, y + 1.5, columnX + titleWidth, y + 1.5);
    
    y += 8;

    // Items
    category.items.forEach((item) => {
      // Item name
      doc.setTextColor(...softBrown);
      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      
      const maxNameWidth = columnWidth - 22;
      let itemName = item.name;
      while (doc.getTextWidth(itemName) > maxNameWidth && itemName.length > 0) {
        itemName = itemName.slice(0, -1);
      }
      if (itemName !== item.name) {
        itemName += "...";
      }
      doc.text(itemName, columnX, y);

      // Price
      doc.setTextColor(...darkBrown);
      doc.setFontSize(9);
      doc.setFont("helvetica", "bold");
      doc.text(`${item.price}`, columnX + columnWidth - 2, y, { align: "right" });
      
      y += itemHeight;
    });

    y += 6;
  };

  categories.forEach((category) => {
    addCategory(category);
  });

  // Footer
  doc.setDrawColor(...warmGold);
  doc.setLineWidth(0.3);
  doc.line(margin, pageHeight - 18, pageWidth - margin, pageHeight - 18);
  
  doc.setTextColor(...softBrown);
  doc.setFontSize(7);
  doc.setFont("helvetica", "italic");
  doc.text("Prices are subject to change  •  All prices inclusive of taxes", pageWidth / 2, pageHeight - 12, { align: "center" });

  // Save
  doc.save("Kaffyn_Menu.pdf");
};
