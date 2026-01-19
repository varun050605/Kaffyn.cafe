import jsPDF from "jspdf";

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

export const generateMenuPdf = () => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const columnWidth = (pageWidth - margin * 3) / 2;
  let y = margin;
  let currentColumn = 0;
  let columnX = margin;

  // Colors
  const primaryColor: [number, number, number] = [26, 20, 16];
  const goldColor: [number, number, number] = [183, 141, 81];
  const lightBg: [number, number, number] = [250, 248, 245];

  // Background
  doc.setFillColor(...lightBg);
  doc.rect(0, 0, pageWidth, pageHeight, "F");

  // Header
  doc.setFillColor(...primaryColor);
  doc.rect(0, 0, pageWidth, 45, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(28);
  doc.setFont("helvetica", "bold");
  doc.text("CAFÉ MENU", pageWidth / 2, 25, { align: "center" });

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("Handcrafted with love", pageWidth / 2, 35, { align: "center" });

  y = 55;

  const categories = Object.values(menuData);

  const addCategory = (category: { title: string; items: { name: string; price: number }[] }) => {
    const categoryHeight = 15 + category.items.length * 7;

    // Check if we need to switch columns or pages
    if (y + categoryHeight > pageHeight - margin) {
      if (currentColumn === 0) {
        currentColumn = 1;
        columnX = margin * 2 + columnWidth;
        y = 55;
      } else {
        doc.addPage();
        doc.setFillColor(...lightBg);
        doc.rect(0, 0, pageWidth, pageHeight, "F");
        currentColumn = 0;
        columnX = margin;
        y = margin;
      }
    }

    // Category title
    doc.setFillColor(...goldColor);
    doc.roundedRect(columnX, y, columnWidth, 10, 2, 2, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text(category.title.toUpperCase(), columnX + 5, y + 7);
    y += 14;

    // Items
    category.items.forEach((item, index) => {
      const itemY = y + index * 7;
      
      // Alternating background
      if (index % 2 === 0) {
        doc.setFillColor(255, 255, 255);
        doc.rect(columnX, itemY - 4, columnWidth, 7, "F");
      }

      doc.setTextColor(...primaryColor);
      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      
      // Item name (truncate if too long)
      const maxNameWidth = columnWidth - 30;
      let itemName = item.name;
      while (doc.getTextWidth(itemName) > maxNameWidth && itemName.length > 0) {
        itemName = itemName.slice(0, -1);
      }
      if (itemName !== item.name) {
        itemName += "...";
      }
      doc.text(itemName, columnX + 3, itemY);

      // Price
      doc.setTextColor(...goldColor);
      doc.setFont("helvetica", "bold");
      doc.text(`₹${item.price}`, columnX + columnWidth - 3, itemY, { align: "right" });
    });

    y += category.items.length * 7 + 8;
  };

  categories.forEach((category) => {
    addCategory(category);
  });

  // Footer on last page
  const lastPageHeight = doc.internal.pageSize.getHeight();
  doc.setFillColor(...primaryColor);
  doc.rect(0, lastPageHeight - 20, pageWidth, 20, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.text("Prices are subject to change • All prices inclusive of taxes", pageWidth / 2, lastPageHeight - 10, { align: "center" });

  // Save
  doc.save("Cafe_Menu.pdf");
};
