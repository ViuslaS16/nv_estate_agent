# EstateAgent - Property Search Application

A fully functional, client-side Single Page Application (SPA) for estate agent property search, built with React. This is an academic coursework project for the University of Westminster, module 5COSC026W Advanced Client-Side Web Development.

## 🏠 Features

- **Property Search**: Multi-criteria search with filters for type, price, bedrooms, date added, and postcode
- **Property Details**: Full property information with image gallery, floor plans, and location map
- **Favourites System**: Drag-and-drop or click to add properties to favourites
- **Responsive Design**: Optimized layouts for mobile, tablet, and desktop devices
- **Client-Side Only**: Works entirely in the browser without server-side code

## 🛠 Technologies Used

- **React 18** - UI component library
- **React Router DOM** - Client-side routing
- **React Tabs** - Tabbed interface for property details
- **React Beautiful DND** - Drag and drop functionality
- **React Select** - Enhanced dropdown components
- **React DatePicker** - Date selection widget
- **Google Maps API** - Property location maps
- **Jest & React Testing Library** - Unit testing

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/react-cw.git
cd react-cw

# Install dependencies
npm install

# Start development server
npm run dev
```

## 🔑 Google Maps Configuration

To enable the interactive map feature:

1. Get an API key from [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Enable the "Maps JavaScript API"
3. Create a `.env` file in the project root:
   ```
   VITE_GOOGLE_MAPS_API_KEY=your_api_key_here
   ```

Without an API key, a fallback display with a link to Google Maps will be shown.

## 🧪 Running Tests

```bash
# Run all tests
npm test

# Run tests with coverage
npm test -- --coverage
```

## 📱 Responsive Design

The application uses a mobile-first approach with CSS Grid and Flexbox for layouts.

### Breakpoints

| Breakpoint | Width | Description |
|------------|-------|-------------|
| Mobile | < 768px | Single column layout, stacked navigation |
| Tablet | 768px - 1023px | Two-column property grid |
| Desktop | ≥ 1024px | Three-column grid, sidebar favourites |

### Breakpoint Justification

- **1024px as primary breakpoint**: Matches iPad landscape orientation, which is a common tablet size and the threshold specified in the coursework requirements
- **768px for tablet**: Standard tablet portrait width, allowing comfortable two-column layouts
- **Mobile-first approach**: Base styles target mobile devices, with media queries progressively enhancing for larger screens

## 🔒 Security Measures

### Content Security Policy (CSP)
The application includes CSP headers in `index.html` to prevent XSS attacks:
- Restricts script sources to self and trusted domains (Google Maps)
- Restricts style sources to self and Google Fonts
- Restricts image sources appropriately

### Input Validation
- All search form inputs are validated before filtering
- Price range validation (min ≤ max)
- Date range validation
- React's JSX automatically escapes content, preventing XSS

## 📁 Project Structure

```
src/
├── components/
│   ├── Favourites/        # Favourites sidebar panel
│   ├── Header/            # Site header with navigation
│   ├── ImageGallery/      # Property image viewer
│   ├── Notification/      # Toast notifications
│   ├── PropertyCard/      # Property list card
│   ├── PropertyGrid/      # Responsive property grid
│   ├── PropertyMap/       # Google Maps integration
│   ├── PropertyTabs/      # Tabbed property details
│   └── SearchForm/        # Search filters form
├── context/
│   └── FavouritesContext.jsx  # Global favourites state
├── data/
│   └── properties.json    # Property listings data
├── pages/
│   ├── PropertyPage.jsx   # Property details page
│   └── SearchPage.jsx     # Main search page
├── styles/
│   └── index.css          # Global styles & design tokens
├── utils/
│   └── searchHelpers.js   # Search filtering utilities
├── __tests__/
│   ├── searchHelpers.test.js  # Search logic tests
│   └── Favourites.test.jsx    # Favourites tests
├── App.jsx                # Root application component
└── main.jsx               # Application entry point
```

## 🚀 Deployment

The application will be available at: `https://nvestate.netlify.app`

## 📊 Testing Coverage

The following functionality is covered by automated tests:

1. **Search Filtering** - Single and multi-criteria search
2. **Validation** - Price, bedroom, and date range validation
3. **Favourites Add** - Adding properties without duplicates
4. **Favourites Remove** - Removing individual and all favourites
5. **Edge Cases** - Empty searches, no results, invalid inputs

## 👤 Author

Visula Sithum Siriwardana 
Module: 5COSC026W Advanced Client-Side Web Development  
Academic Year: 2025/26
University of Westminster Student

## 📄 License

This project is submitted as academic coursework and is not licensed for commercial use.
