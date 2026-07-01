/*Creating Schema*/
CREATE SCHEMA `athire` ;

CREATE TABLE `athire`.`user` (
  `UserID` INT NOT NULL AUTO_INCREMENT,
  `FName` VARCHAR(20) NOT NULL,
  `LName` VARCHAR(20) NULL,
  `Email` VARCHAR(50) NOT NULL,
  `Password` VARCHAR(500) NOT NULL,
  `Date_of_Birth` DATE NULL,
  `Gender` VARCHAR(1) NULL,
  `City` VARCHAR(30) NULL,
  `Province` VARCHAR(20) NULL,
  `Country` VARCHAR(30) NULL,
  PRIMARY KEY (`UserID`));

/*CREATE TABLE `athire`.`weather_type` (
  `WeatherType_ID` INT NOT NULL AUTO_INCREMENT,
  `Weather_Type` VARCHAR(15) NOT NULL,
  PRIMARY KEY (`WeatherType_ID`));*/
  
CREATE TABLE `athire`.`weather` (
  `WeatherID` INT NOT NULL AUTO_INCREMENT,
  `Temperature` VARCHAR(8) NOT NULL,
  `Feels_Like` VARCHAR(8) NOT NULL,
  `Weather_Type` VARCHAR(10),
  `Wind` VARCHAR(10) NOT NULL,
  `Pressure` VARCHAR(10) NOT NULL,
  `Humidity` VARCHAR(10) NOT NULL,
  `Visibility` VARCHAR(10) NOT NULL,
  `UV_Index` VARCHAR(10) NULL,
  `Location` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`WeatherID`));

CREATE TABLE `athire`.`activity` (
  `A_ID` INT NOT NULL AUTO_INCREMENT,
  `Activity_Type` VARCHAR(15) NOT NULL,
  `Activity_Name` VARCHAR(45) NOT NULL,
  `Activity` LONGBLOB NOT NULL,
  PRIMARY KEY (`A_ID`));

CREATE TABLE `athire`.`outfit` (
  `O_ID` INT NOT NULL AUTO_INCREMENT,
  `Outfit_Type` VARCHAR(15) NOT NULL,
  `Outfit_Name` VARCHAR(45) NOT NULL,
  `Outfit` LONGBLOB NOT NULL,
  PRIMARY KEY (`O_ID`));

/*CREATE TABLE `athire`.`recommended_activity` (
  `RA_ID` INT NOT NULL AUTO_INCREMENT,
  `AT_ID` INT NOT NULL,
  `WeatherID` INT NOT NULL,
  `Activity` BLOB NOT NULL,
  PRIMARY KEY (`RA_ID`),
  FOREIGN KEY (`WeatherID`) REFERENCES `athire`.`weather`(`WeatherID`),
  FOREIGN KEY (`AT_ID`) REFERENCES `athire`.`activity_type`(`AT_ID`));

CREATE TABLE `athire`.`recommended_outfit` (
  `RO_ID` INT NOT NULL AUTO_INCREMENT,
  `OT_ID` INT NOT NULL,
  `WeatherID` INT NOT NULL,
  `Outfit` BLOB NOT NULL,
  PRIMARY KEY (`RO_ID`),
  FOREIGN KEY (`WeatherID`) REFERENCES `athire`.`weather`(`WeatherID`),
  FOREIGN KEY (`OT_ID`) REFERENCES `athire`.`outfit_type`(`OT_ID`));
  */
  
  
  
  
  /*Populating Schema*/
  
  INSERT INTO athire.activity (Activity_Type, Activity_Name, Activity)
VALUES
    ('Indoor', 'Yoga', 'C:\Users\hp\Downloads\Activity\Yoga.jpg'),
    ('Indoor', 'Zumba','C:\Users\hp\Downloads\Activity\Zumba.jpg'),
    ('Indoor', 'Spinning','C:\Users\hp\Downloads\Activity\Spinning.jpg'),
    ('Indoor', 'Pilates','C:\Users\hp\Downloads\Activity\Pilates.png'),
    ('Indoor', 'Boxing','C:\Users\hp\Downloads\Activity\Boxing.png'),
    ('Indoor', 'CrossFit','C:\Users\hp\Downloads\Activity\CrossFit.png'),
    ('Indoor', 'Weightlifting','C:\Users\hp\Downloads\Activity\Weightlifting.png'),
    ('Indoor', 'Swimming','C:\Users\hp\Downloads\Activity\Swimming.png'),
    ('Indoor', 'Rock Climbing','C:\Users\hp\Downloads\Activity\Rock Climbing.png'),
    ('Indoor', 'Badminton','C:\Users\hp\Downloads\Activity\Badminton.png'),
    ('Outdoor', 'Hiking','C:\Users\hp\Downloads\Activity\Hiking.png'),
    ('Outdoor', 'Running','C:\Users\hp\Downloads\Activity\Running.png'),
    ('Outdoor', 'Cycling','C:\Users\hp\Downloads\Activity\Cycling.png'),
    ('Outdoor', 'Soccer','C:\Users\hp\Downloads\Activity\Soccer.png'),
    ('Outdoor', 'Basketball','C:\Users\hp\Downloads\Activity\Basketball.png'),
    ('Outdoor', 'Tennis','C:\Users\hp\Downloads\Activity\Tennis.png'),
    ('Outdoor', 'Golf','C:\Users\hp\Downloads\Activity\Golf.png'),
    ('Outdoor', 'Camping','C:\Users\hp\Downloads\Activity\Camping.png');


INSERT INTO athire.outfit (Outfit_Type, Outfit_Name, Outfit)
VALUES
    ('Summers', 'Shorts','C:\Users\hp\Downloads\Outfits\Shorts.png'),
    ('Summers', 'T-shirt','C:\Users\hp\Downloads\Outfits\T-shirt.png'),
    ('Summers', 'Jeans','C:\Users\hp\Downloads\Outfits\Jeans.png'),
    ('Summers', 'Maxi Dress','C:\Users\hp\Downloads\Outfits\Maxi Dress.png'),
    ('Summers', 'Romper','C:\Users\hp\Downloads\Outfits\Romper.png'),
    ('Summers', 'Skirt','C:\Users\hp\Downloads\Outfits\Skirt.png'),
    ('Summers', 'Blouse','C:\Users\hp\Downloads\Outfits\Blouse.png'),
    ('Summers', 'Flip Flops','C:\Users\hp\Downloads\Outfits\Flip Flops.png'),
    ('Summers', 'Sunglasses','C:\Users\hp\Downloads\Outfits\Sunglasses.png'),
    ('Summers', 'Hat','C:\Users\hp\Downloads\Outfits\Hat.png'),
    ('Winters', 'Sweater','C:\Users\hp\Downloads\Outfits\Sweater.png'),
    ('Winters', 'Coat','C:\Users\hp\Downloads\Outfits\Coat.png'),
    ('Winters', 'Scarf','C:\Users\hp\Downloads\Outfits\Scarf.png'),
    ('Winters', 'Sweater Dress','C:\Users\hp\Downloads\Outfits\Sweater Dress.png'),
    ('Winters', 'Boots','C:\Users\hp\Downloads\Outfits\Boots.png'),
    ('Winters', 'Sweatpants','C:\Users\hp\Downloads\Outfits\Sweatpants.png'),
    ('Winters', 'Hoodie','C:\Users\hp\Downloads\Outfits\Hoodie.png'),
    ('Winters', 'Gloves','C:\Users\hp\Downloads\Outfits\Gloves.png'),
    ('Winters', 'Beanie','C:\Users\hp\Downloads\Outfits\Beanie.png'),
    ('Winters', 'Thick Socks','C:\Users\hp\Downloads\Outfits\Thick Socks.png');


DELIMITER $$

CREATE TRIGGER before_insert_weather
BEFORE INSERT ON `athire`.`weather`
FOR EACH ROW
BEGIN
  -- Convert Temperature from VARCHAR to DECIMAL for comparison
  DECLARE temp DECIMAL(5,2);
  
  SET temp = CAST(NEW.Temperature AS DECIMAL(5,2));

  IF temp >= 30 THEN
    SET NEW.Weather_Type = 'Hot';
  ELSEIF temp >= 20 AND temp < 30 THEN
    SET NEW.Weather_Type = 'Warm';
  ELSEIF temp >= 10 AND temp < 20 THEN
    SET NEW.Weather_Type = 'Cool';
  ELSEIF temp >= 0 AND temp < 10 THEN
    SET NEW.Weather_Type = 'Cold';
  ELSE
    SET NEW.Weather_Type = 'Freezing';
  END IF;
END $$

DELIMITER ;

/*Dummy Values*/
INSERT INTO athire.weather (Temperature, Feels_Like, Wind, Pressure, Humidity, Visibility, UV_Index, Location)
VALUES ('25.5', '22', '15 km/h', '1015 hPa', '60%', '10 km', 'Moderate', 'New York');




/*View*/

/*INSERT INTO athire.weather (Temperature, Feels_Like, Wind, Pressure, Humidity, Visibility, UV_Index, Location)
VALUES ('18', '15', '10 km/h', '1012 hPa', '70%', '8 km', 'Low', 'London');

DELIMITER $$

CREATE TRIGGER after_insert_weather
AFTER INSERT ON athire.weather
FOR EACH ROW
BEGIN
  SET @sql = CONCAT(
    'CREATE OR REPLACE VIEW athire.weather_recommendations AS 
     SELECT 
        w.WeatherID,
        w.Weather_Type,

        -- Recommend activities based on Weather_Type with images
        GROUP_CONCAT(DISTINCT CASE 
            WHEN w.Weather_Type IN ("Warm", "Cool", "Cold") THEN CONCAT(a.Activity_Name, "::", a.Activity)
            WHEN w.Weather_Type IN ("Hot", "Freezing") AND a.Activity_Type = "Indoor" THEN CONCAT(a.Activity_Name, "::", a.Activity)
            ELSE NULL
        END ORDER BY a.A_ID LIMIT 5) AS Recommended_Activities,

        -- Recommend outfits based on Weather_Type with images
        GROUP_CONCAT(DISTINCT CASE 
            WHEN w.Weather_Type IN ("Hot", "Warm", "Cool") AND o.Outfit_Type = "Summers" THEN CONCAT(o.Outfit_Name, "::", o.Outfit)
            WHEN w.Weather_Type IN ("Cold", "Freezing") AND o.Outfit_Type = "Winters" THEN CONCAT(o.Outfit_Name, "::", o.Outfit)
            ELSE NULL
        END ORDER BY o.O_ID LIMIT 5) AS Recommended_Outfits

     FROM 
        athire.weather w
     LEFT JOIN 
        athire.activity a ON (
            (w.Weather_Type IN ("Warm", "Cool", "Cold")) OR 
            (w.Weather_Type IN ("Hot", "Freezing") AND a.Activity_Type = "Indoor")
        )
     LEFT JOIN 
        athire.outfit o ON (
            (w.Weather_Type IN ("Hot", "Warm", "Cool") AND o.Outfit_Type = "Summers") OR 
            (w.Weather_Type IN ("Cold", "Freezing") AND o.Outfit_Type = "Winters")
        )
     WHERE w.WeatherID = ', NEW.WeatherID, ' 
     GROUP BY w.WeatherID'
  );

  PREPARE stmt FROM @sql;
  EXECUTE stmt;
  DEALLOCATE PREPARE stmt;
END $$

DELIMITER ;*/