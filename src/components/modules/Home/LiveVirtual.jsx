const LiveVirtual = ({ setLiveVirtual, category }) => {
  const onChangeLiveVirtual = (type, eventTypeId, isChecked) => {
    const obj = { type, eventTypeId, isChecked };

    setLiveVirtual((prev) => {
      const index = prev.findIndex(
        (item) => item.eventTypeId === eventTypeId && item.type === type,
      );

      if (index !== -1) {
        const updated = [...prev];
        updated[index] = {
          ...updated[index],
          isChecked,
        };
        return updated;
      }

      return [...prev, obj];
    });
  };
  return (
    <ul className="live_virtual">
      <li>
        <input
          onChange={(e) =>
            onChangeLiveVirtual("live", category, e.target?.checked)
          }
          type="checkbox"
          className="filter-checkbox"
          defaultValue="Order one"
        />
        <label>LIVE</label>
      </li>
      <li>
        <input
          onChange={(e) =>
            onChangeLiveVirtual("virtual", category, e.target?.checked)
          }
          type="checkbox"
          className="filter-checkbox"
          defaultValue="Order Two"
        />
        <label>VIRTUAL</label>
      </li>
    </ul>
  );
};

export default LiveVirtual;
