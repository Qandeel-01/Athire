import React, { useState } from "react";
import "./OutfitBuilder.css";

const BASE_PATH = "/src/components/assets/outfitbuilderbg removed";

const getImagePath = (basePath, index) => basePath + '/' + index + '.png';

const imageMapping = {
  women: {
    tops: {
      "blouses-shirts": [...Array(15)].map((_, i) => getImagePath(BASE_PATH + '/women/tops/blouses-shirts', i + 1)),
      cardigans: [...Array(15)].map((_, i) => getImagePath(BASE_PATH + '/women/tops/cardigans', i + 1)),
      dresses: [...Array(15)].map((_, i) => getImagePath(BASE_PATH + '/women/tops/dresses', i + 1)),
      hoodies: [...Array(15)].map((_, i) => getImagePath(BASE_PATH + '/women/tops/hoodies', i + 1)),
      jackets: [...Array(15)].map((_, i) => getImagePath(BASE_PATH + '/women/tops/jackets', i + 1)),
      sweaters: [...Array(15)].map((_, i) => getImagePath(BASE_PATH + '/women/tops/sweaters', i + 1)),
      "tshirts-tops": [...Array(15)].map((_, i) => getImagePath(BASE_PATH + '/women/tops/tshirts-tops', i + 1))
    },
    bottoms: {
      skirts: [...Array(15)].map((_, i) => getImagePath(BASE_PATH + '/women/bottoms/skirts', i + 1)),
      trousers: [...Array(15)].map((_, i) => getImagePath(BASE_PATH + '/women/bottoms/trousers', i + 1)),
      jeans: [...Array(15)].map((_, i) => getImagePath(BASE_PATH + '/women/bottoms/jeans', i + 1)),
      pants: [...Array(15)].map((_, i) => getImagePath(BASE_PATH + '/women/bottoms/pants', i + 1))
    }
  },
  men: {
    tops: {
      hoodies: [...Array(15)].map((_, i) => getImagePath(BASE_PATH + '/men/tops/hoodies', i + 1)),
      jackets: [...Array(15)].map((_, i) => getImagePath(BASE_PATH + '/men/tops/jackets', i + 1)),
      polos: [...Array(15)].map((_, i) => getImagePath(BASE_PATH + '/men/tops/polos', i + 1)),
      shirts: [...Array(15)].map((_, i) => getImagePath(BASE_PATH + '/men/tops/shirts', i + 1)),
      sweaters: [...Array(15)].map((_, i) => getImagePath(BASE_PATH + '/men/tops/sweaters', i + 1)),
      "t-shirts": [...Array(15)].map((_, i) => getImagePath(BASE_PATH + '/men/tops/t-shirts', i + 1))
    },
    bottoms: {
      shorts: [...Array(15)].map((_, i) => getImagePath(BASE_PATH + '/men/bottoms/shorts', i + 1)),
      pants: [...Array(15)].map((_, i) => getImagePath(BASE_PATH + '/men/bottoms/pants', i + 1)),
      "jeans&trousers": [...Array(15)].map((_, i) => getImagePath(BASE_PATH + '/men/bottoms/jeans&trousers', i + 1))
    }
  }
};

const subCategories = {
  Women: {
    Tops: [
      "Blouses & Shirts",
      "Cardigans",
      "Dresses",
      "Hoodies",
      "Jackets",
      "Sweaters",
      "Tshirts & Tops",
    ],
    Bottoms: [
      "Skirts",
      "Trousers",
      "Jeans",
      "Pants"
    ],
  },
  Men: {
    Tops: [
      "Hoodies",
      "Jackets",
      "Polos",
      "Shirts",
      "Sweaters",
      "T-Shirts",
    ],
    Bottoms: ["Shorts", "Pants", "Jeans & Trousers"],
  },
};
const OutfitBuilder = () => {
  const [gender, setGender] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [selectedOutfit, setSelectedOutfit] = useState({
    upperPart: null,
    lowerPart: null,
  });
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupItems, setPopupItems] = useState([]);

  const formatForURL = (str) => {
    return str.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-');
  };

  const handleGenderSelection = (selectedGender) => {
    setGender(selectedGender);
    setSelectedCategory(null);
    setSelectedSubCategory(null);
    setIsSidePanelOpen(false);
    setSelectedOutfit({ upperPart: null, lowerPart: null });
  };

  const handleCategorySelection = (category) => {
    setSelectedCategory(category);
    setSelectedSubCategory(null);
    setIsSidePanelOpen(true);
  };

  const handleSubCategorySelection = (subCategory) => {
    setSelectedSubCategory(subCategory);
    setIsPopupOpen(true);

    const formattedSubCategory = formatForURL(subCategory);
    const categoryImages = 
      imageMapping[gender.toLowerCase()][selectedCategory.toLowerCase()][formattedSubCategory] || [];

    const items = categoryImages.map((imagePath, index) => ({
      id: index + 1,
      name: subCategory + ' ' + (index + 1),
      image: imagePath,
    }));

    setPopupItems(items);
  };

  const handleItemSelection = (item) => {
    const type = selectedCategory === "Tops" ? "upperPart" : "lowerPart";
    setSelectedOutfit((prev) => ({ ...prev, [type]: item }));
    setIsPopupOpen(false);
  };

  const handleImageError = (e) => {
    const currentSrc = e.target.src;
    if (currentSrc.endsWith('.png')) {
      e.target.src = currentSrc.replace('.png', '.jpg');
    } else if (currentSrc.endsWith('.jpg')) {
      e.target.src = BASE_PATH + '/placeholder.png';
    }
  };

  const saveOutfit = () => {
    console.log("Saved outfit:", selectedOutfit);
    alert("Outfit saved successfully!");
  };

  return (
    <div className="builder-container">
      <header className="builder-header">
        <h1 className="title">OUTFIT BUILDER</h1>
        <div className="subtitle-container">
          <p className="subtitle main">#1 Tool for creating a perfect outfit</p>
          <p className="subtitle sub">Choose from dozens of outfits ideas</p>
          <p className="subtitle sub">
            Find, mix and match then buy the best outfit that represents your style
          </p>
        </div>
      </header>

      <div className="gender-selection">
        {["Women", "Men"].map((genderOption) => (
          <button
            key={genderOption}
            className={"gender-button" + (gender === genderOption ? " active" : "")}
            onClick={() => handleGenderSelection(genderOption)}
          >
            {genderOption}
          </button>
        ))}
      </div>

      {gender && (
        <div className="category-selection">
          {["Tops", "Bottoms"].map((category) => (
            <button
              key={category}
              className={"category-button" + (selectedCategory === category ? " active" : "")}
              onClick={() => handleCategorySelection(category)}
            >
              {category}
            </button>
          ))}
        </div>
      )}

      <div
        className={"side-panel-overlay" + (isSidePanelOpen ? " active" : "")}
        onClick={() => setIsSidePanelOpen(false)}
      />

      <div className={"subcategory-panel" + (isSidePanelOpen ? " active" : "")}>
        <h3>{selectedCategory}</h3>
        <div className="subcategory-grid">
          {selectedCategory &&
            subCategories[gender][selectedCategory].map((subCategory) => (
              <div
                key={subCategory}
                className="subcategory-item"
                onClick={() => handleSubCategorySelection(subCategory)}
              >
                <div className="subcategory-image-container">
                  <img
                    src={BASE_PATH + '/' + gender.toLowerCase() + '/' + 
                         selectedCategory.toLowerCase() + '/' + 
                         formatForURL(subCategory) + '/1.png'}
                    alt={subCategory}
                    onError={handleImageError}
                  />
                  <span className="subcategory-name">{subCategory}</span>
                </div>
              </div>
            ))}
        </div>
        <button 
          className="close-panel-button"
          onClick={() => setIsSidePanelOpen(false)}
        >
          Close
        </button>
      </div>

      {isPopupOpen && (
        <div className="popup-overlay" onClick={() => setIsPopupOpen(false)}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <div className="popup-header">
              <h3>{selectedSubCategory}</h3>
              <button
                className="close-popup-button"
                onClick={() => setIsPopupOpen(false)}
              >
                Close
              </button>
            </div>
            <div className="popup-grid">
              {popupItems.map((item) => (
                <div
                  key={item.id}
                  className="popup-item-card"
                  onClick={() => handleItemSelection(item)}
                >
                  <div className="popup-item-image-container">
                    <img
                      src={item.image}
                      alt={item.name}
                      onError={handleImageError}
                    />
                  </div>
                  <p>{item.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="preview-section">
        <h2 className="section-title">Preview</h2>
        <div className="mannequin-container">
          <div className="mannequin">
            <div className="mannequin-head"></div>
            <div className="mannequin-body">
              <div className="mannequin-top">
                {selectedOutfit.upperPart && (
                  <img
                    src={selectedOutfit.upperPart.image}
                    alt="Selected top"
                    className="selected-top"
                    onError={handleImageError}
                  />
                )}
              </div>
              <div className="mannequin-bottom">
                {selectedOutfit.lowerPart && (
                  <img
                    src={selectedOutfit.lowerPart.image}
                    alt="Selected bottom"
                    className="selected-bottom"
                    onError={handleImageError}
                  />
                )}
              </div>
            </div>
          </div>
          <div className="outfit-details">
            <div className="detail-card">
              <h3>Top</h3>
              <p>{selectedOutfit.upperPart ? selectedOutfit.upperPart.name : "No top selected"}</p>
            </div>
            <div className="detail-card">
              <h3>Bottom</h3>
              <p>{selectedOutfit.lowerPart ? selectedOutfit.lowerPart.name : "No bottom selected"}</p>
            </div>
          </div>
        </div>
      </div>

      <button className="save-button" onClick={saveOutfit}>
        Save Outfit
      </button>
    </div>
  );
};

export default OutfitBuilder;