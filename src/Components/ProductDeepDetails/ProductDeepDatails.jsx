import "./ProductDeepDatails.css";

const detailsMap = [
  { key: "sku", label: "SKU" },
  { key: "weight", label: "Weight" },
  { key: "dimensions", label: "Dimensions" },
  { key: "stock", label: "Stock" },
  { key: "availabilityStatus", label: "Availability" },
  { key: "returnPolicy", label: "Return Policy" },
  { key: "minimumOrderQuantity", label: "Min Order Qty" },
];

const ProductDeepDatails = ({ product }) => {
  return (
    <div className="ProductDeepDatails">
      {detailsMap.map(({ key, label }) => {
        if (product[key] === undefined || product[key] === null) return null;
        let value = product[key];
        if (key === "dimensions" && typeof value === "object") {
          value = `W: ${value.width}, H: ${value.height}, D: ${value.depth}`;
        }
        if (Array.isArray(value)) {
          value = value.join(", ");
        }
        return (
            <div className="ProductDeepDatails">
                <div className="detail-row" key={key}>
                    <span className="detail-label">{label}:</span>{" "}
                    <span className="detail-value">{value}</span>
                </div>
            </div>
        );
      })}
    </div>
  );
};

export default ProductDeepDatails;