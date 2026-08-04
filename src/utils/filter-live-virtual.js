export const filterLiveVirtual = (liveVirtual, category, data, inPlay) => {
  if (!data) return [];
  const categorySettings = liveVirtual.filter(
    (item) => item.eventTypeId === category,
  );

  const live =
    categorySettings.find((item) => item.type === "live")?.isChecked ?? false;

  const virtual =
    categorySettings.find((item) => item.type === "virtual")?.isChecked ??
    false;

  const groupedData = Object.entries(data)
    .filter(([, value]) => {
      // if (value.eventTypeId !== category) return false;
      if (value.inPlay !== inPlay) return false;
      if (!value.visible) return false;

      const isSRL = value.eventName?.toLowerCase().includes("srl") ?? false;

      // both checked OR both unchecked => show all
      if (live === virtual) return true;

      // live only
      if (live) return !isSRL;

      // virtual only
      return isSRL;
    })
    .sort(([, a], [, b]) => b.inPlay - a.inPlay)
    .sort(([, a], [, b]) => a.sort - b.sort);

  return groupedData;
};
