const toggleTheme = (setTheme) => {
  const currentTheme = localStorage.getItem("theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";

  localStorage.setItem("theme", newTheme);

  setTheme(newTheme);
};

export default toggleTheme;
