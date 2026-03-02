// Centralized constants to avoid hardcoded values scattered across files

export const API_BASE_URL = "https://momentum.redberryinternship.ge";
export const AUTH_TOKEN = "Bearer 9e882e2f-3297-435e-b537-67817136c385";

// Category name mapping (department full name -> short display name)
export const CATEGORY_NAME_MAP: Record<string, string> = {
  "დიზაინერების დეპარტამენტი": "დიზაინი",
  "გაყიდვები და მარკეტინგის დეპარტამენტი": "მარკეტინგი",
  "ლოჯოსტიკის დეპარტამენტი": "ლოჯისტიკა",
  "ტექნოლოგიების დეპარტამენტი": "ინფ. ტექ",
  "ადმინისტრაციის დეპარტამენტი": "ადმინისტრაცია",
  "ადამიანური რესურსების დეპარტამენტი": "HR",
  "ფინანსების დეპარტამენტი": "ფინანსები",
  "მედიის დეპარტამენტი": "მედია",
};

// Category color mapping
type Color = "pink" | "orange" | "blue" | "yellow";

export const CATEGORY_COLOR_MAP: Record<string, Color> = {
  "დიზაინერების დეპარტამენტი": "pink",
  "ლოჯოსტიკის დეპარტამენტი": "blue",
  "გაყიდვები და მარკეტინგის დეპარტამენტი": "orange",
  "ტექნოლოგიების დეპარტამენტი": "yellow",
  "ადმინისტრაციის დეპარტამენტი": "pink",
  "ადამიანური რესურსების დეპარტამენტი": "blue",
  "ფინანსების დეპარტამენტი": "orange",
  "მედიის დეპარტამენტი": "yellow",
};

// Priority color mapping
export const PRIORITY_COLOR_MAP: Record<string, "red" | "orange" | "green"> = {
  "მაღალი": "red",
  "საშუალო": "orange",
  "დაბალი": "green",
};

// Georgian months for date formatting
export const GEORGIAN_MONTHS_SHORT = [
  "იანვ", "თებ", "მარ", "აპრ", "მაი", "ივნ",
  "ივლ", "აგვ", "სექ", "ოქტ", "ნოემ", "დეკ",
];

// Georgian weekdays
export const GEORGIAN_WEEKDAYS = ["კვი", "ორშ", "სამშ", "ოთხშ", "ხუთშ", "პარ", "შაბ"];

// Helper functions
export function getCategoryName(departmentName: string | undefined): string | undefined {
  if (!departmentName) return undefined;
  return CATEGORY_NAME_MAP[departmentName];
}

export function getCategoryColor(departmentName: string | undefined): Color {
  if (!departmentName) return "orange";
  return CATEGORY_COLOR_MAP[departmentName] || "orange";
}

export function getPriorityColor(priorityName: string | undefined): "red" | "orange" | "green" | undefined {
  if (!priorityName) return undefined;
  return PRIORITY_COLOR_MAP[priorityName];
}

export function formatDateGeorgian(dateString: string | null | undefined): string {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "N/A";
  const year = date.getFullYear();
  const monthIndex = date.getMonth();
  const day = date.getDate();
  return `${day} ${GEORGIAN_MONTHS_SHORT[monthIndex]}, ${year}`;
}

export function formatDueDateWithWeekday(date: string | undefined | null): string {
  if (!date) return "N/A";
  const dueDate = new Date(date);
  const weekdayName = GEORGIAN_WEEKDAYS[dueDate.getDay()];
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  };
  const formattedDate = dueDate.toLocaleDateString("en-GB", options);
  return `${weekdayName} - ${formattedDate}`;
}

// Validation constants
export const MAX_IMAGE_SIZE = 600 * 1024; // 600KB
export const GEORGIAN_LATIN_REGEX = /^[a-zA-Z\u10A0-\u10FF\s']+$/;
