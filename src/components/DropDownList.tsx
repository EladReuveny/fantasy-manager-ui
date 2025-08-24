type DropDownListProps<T> = {
  items: T[];
  selectedItems: T[];
  handleSelectItem: (item: T, isChecked?: boolean) => void;
  renderItem: (item: T) => React.ReactNode;
  label: string;
};

const DropDownList = <T,>({
  items,
  selectedItems,
  handleSelectItem,
  renderItem,
  label,
}: DropDownListProps<T>) => {
  return (
    <div className="border-2 border-gray-500 rounded group-open:border-(--color-text) hover:border-(--color-text) focus:border-(--color-primary)">
      <details className="group p-1">
        <summary className="flex items-center justify-between py-1 px-2 mb-2 hover:bg-(--color-text)/15 group-open:hover:bg-(--color-primary) group-open:bg-(--color-primary)">
          <div className="flex flex-wrap gap-3">
            {selectedItems.length > 0 ? (
              selectedItems.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 bg-(--color-text)/30 py-1 px-3 rounded hover:backdrop-brightness-125"
                >
                  <div className="flex items-center gap-2">
                    {renderItem(item)}
                  </div>
                  <button type="button">
                    <i
                      className="fa-solid fa-xmark text-gray-300 hover:brightness-120"
                      onClick={() => handleSelectItem(item, true)}
                      title="Remove"
                    ></i>
                  </button>
                </div>
              ))
            ) : (
              <span>Select {label}</span>
            )}
          </div>
          <i className="fa-solid fa-chevron-down group-open:rotate-180 duration-300"></i>
        </summary>
        <hr className="border-t-1 border-gray-400" />
        <ul>
          {items.map((item, i) => (
            <li
              key={i}
              className={`flex items-center gap-3 cursor-pointer py-1 px-4  ${
                selectedItems.includes(item)
                  ? "bg-(--color-primary)/25 hover:bg-(--color-primary)/25 text-(--color-primary)"
                  : "hover:bg-(--color-text)/15"
              }`}
              onClick={() => handleSelectItem(item)}
            >
              {renderItem(item)}
            </li>
          ))}
        </ul>
      </details>
    </div>
  );
};

export default DropDownList;
