export const DateFormat = () => {
  // Function to format ISO date to dd/mm/yyyy format
  const formatDate = (isoDate: string): string => {
    const date = new Date(isoDate);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${day < 10 ? "0" + day : day}/${
      month < 10 ? "0" + month : month
    }/${year}`;
  };

  return {
    formatDate,
  };
};

export const LongDateFormat = (dateString) => {
  const date = new Date(dateString);
  const options = { year: "numeric", month: "long", day: "2-digit" };
  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);
  const [month, day, year] = formattedDate.split(" ");
  return `${day} ${month} , ${year}`.replace(/,/,'');
};
