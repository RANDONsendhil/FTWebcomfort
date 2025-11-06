export default `
label {
  font-family: sans-serif;
  font-size: 1rem;
  padding-right: 10px;
}

select {
  font-size: 0.9rem;
  padding: 2px 5px;
}

.dropdown {
  display: flex;
  position: relative;
  width: 100%;
  margin-top: 15px;
  flex-direction: column-reverse;
  justify-content: space-around;
}

.dropdown-menu {
  position: relative;
  width: 100%;
  background: white;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  animation: slideDown 0.3s ease-out;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.dropdown-item {
  padding: 12px 20px;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  border-bottom: 1px solid #f0f0f0;
  font-size: 0.95rem;
  color: #333;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.dropdown-item:last-child {
  border-bottom: none;
}

.dropdown-item:hover {
  background: #f8f9fa;
  color: #007bff;
}

.dropdown-item:active {
  background: #e9ecef;
}

.dropdown-item.selected {
  background: #007bff;
  color: white;
  font-weight: bold;
}

.dropdown-item.selected:hover {
  background: #0056b3;
}

/* Add icon/checkmark for selected item */
.dropdown-item.selected::after {
  content: "✓";
  margin-left: 10px;
  font-weight: bold;
}

/* Empty state */
.dropdown-menu:empty::after {
  content: "Aucune option disponible";
  display: block;
  padding: 20px;
  text-align: center;
  color: #999;
  font-style: italic;
}

/* Container styles */
#dropdown-container {
  margin-top: 10px;
}

#dropdown-container:empty {
  display: none !important;
}
`;
