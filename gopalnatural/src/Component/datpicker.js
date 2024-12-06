import React, { useState } from "react";
import DatePicker from "react-multi-date-picker";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";

const CardWithCalendar = () => {
  const [selectedDates, setSelectedDates] = useState([]);
  const [isRangeMode, setIsRangeMode] = useState(false);

  // Days of the week
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  // Function to get the day name from a date
  const getDayName = (date) => {
    const [day, month, year] = date.split("/").map(Number);
    const parsedDate = new Date(`${year}-${month}-${day}`);
    return parsedDate.toString() === "Invalid Date"
      ? "Invalid Date"
      : days[parsedDate.getDay()];
  };

  // Generate all dates in a range (inclusive)
  const generateDatesInRange = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const dateArray = [];

    while (startDate <= endDate) {
      const day = startDate.getDate().toString().padStart(2, "0");
      const month = (startDate.getMonth() + 1).toString().padStart(2, "0");
      const year = startDate.getFullYear();

      dateArray.push(`${day}/${month}/${year}`);
      startDate.setDate(startDate.getDate() + 1); // Increment day
    }

    return dateArray;
  };

  // Function to handle date selection
  const handleDateChange = (dates) => {
    let newDates = [];

    if (isRangeMode && dates.length === 2) {
      const start = dates[0];
      const end = dates[1];

      // Generate all dates in the selected range
      newDates = generateDatesInRange(start, end).map((date) => ({
        date,
        quantity: 1, // Initialize with quantity 1
      }));
    } else if (!isRangeMode) {
      newDates = dates.map((date) => ({
        date: date.toString(),
        quantity: 1, // Initialize with quantity 1
      }));
    }

    setSelectedDates((prevDates) => {
      // Avoid duplicates
      const uniqueDates = [
        ...prevDates,
        ...newDates.filter(
          (newDate) => !prevDates.some((oldDate) => oldDate.date === newDate.date)
        ),
      ];
      return uniqueDates;
    });
  };

  // Function to update quantity for a specific date
  const updateQuantity = (date, change) => {
    setSelectedDates((prevDates) =>
      prevDates.map((item) =>
        item.date === date
          ? { ...item, quantity: Math.max(0, item.quantity + change) }
          : item
      )
    );
  };

  // Function to remove a specific date
  const handleRemoveDate = (dateToRemove) => {
    setSelectedDates((prevDates) =>
      prevDates.filter((item) => item.date !== dateToRemove)
    );
  };

  return (
    <div style={styles.card}>
      <h2 style={styles.title}>Select Dates</h2>

      {/* Mode Toggle */}
      <div style={styles.toggle}>
        <label>
          <input
            type="checkbox"
            checked={isRangeMode}
            onChange={() => {
              setIsRangeMode(!isRangeMode);
              setSelectedDates([]); // Reset selection on mode change
            }}
          />
          Enable Date Range Selection
        </label>
      </div>

      {/* Calendar */}
      <DatePicker
        onChange={handleDateChange}
        multiple={!isRangeMode}
        range={isRangeMode}
        format="DD/MM/YYYY"
        placeholder="Select Dates"
        style={styles.datePicker}
      />

      {/* Display Selected Dates */}
      {selectedDates.length > 0 && (
        <div className="selected-dates" style={styles.selectedDatesContainer}>
          <p style={styles.heading}>Selected Dates:</p>
          {selectedDates.map(({ date, quantity }) => (
            <div key={date} style={styles.selectedDateItem}>
              <span style={styles.dateText}>
                {date} ({getDayName(date)})
              </span>
              <div style={styles.quantityContainer}>
                <AiOutlineMinus
                  className="quantity-incr"
                  style={styles.icon}
                  onClick={() => updateQuantity(date, -1)}
                />
                <span style={styles.quantityText}>{quantity}</span>
                <AiOutlinePlus
                  className="quantity-incr"
                  style={styles.icon}
                  onClick={() => updateQuantity(date, 1)}
                />
              </div>
              <IoMdClose
                style={styles.removeIcon}
                onClick={() => handleRemoveDate(date)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  card: {
    maxWidth: "400px",
    margin: "20px auto",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    backgroundColor: "#fff",
  },
  title: {
    marginBottom: "15px",
    fontSize: "18px",
  },
  toggle: {
    marginBottom: "15px",
    fontSize: "14px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  datePicker: {
    marginBottom: "20px",
  },
  selectedDatesContainer: {
    marginTop: "15px",
    textAlign: "left",
  },
  heading: {
    fontSize: "16px",
    fontWeight: "bold",
  },
  selectedDateItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px",
    border: "1px solid #ccc",
    marginBottom: "5px",
  },
  dateText: {
    width: "45%",
  },
  quantityContainer: {
    width: "25%",
    display: "flex",
    alignItems: "center",
  },
  icon: {
    cursor: "pointer",
    fontSize: "18px",
  },
  quantityText: {
    margin: "0 10px",
    fontWeight: "bold",
  },
  removeIcon: {
    cursor: "pointer",
    color: "red",
    fontSize: "18px",
  },
};

export default CardWithCalendar;
