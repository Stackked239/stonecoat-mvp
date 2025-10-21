// Mock ZIP Code Data for Florida
// Used for: Distance calculations, pricing algorithms, service area matching

export interface ZipCodeData {
  zipCode: string;
  city: string;
  state: string;
  medianIncome: number;
  coordinates: { lat: number; lng: number };
}

export const zipCodeData: Record<string, ZipCodeData> = {
  // Tampa Area
  '33602': { zipCode: '33602', city: 'Tampa', state: 'FL', medianIncome: 48500, coordinates: { lat: 27.9506, lng: -82.4572 } },
  '33603': { zipCode: '33603', city: 'Tampa', state: 'FL', medianIncome: 42100, coordinates: { lat: 28.0078, lng: -82.4531 } },
  '33604': { zipCode: '33604', city: 'Tampa', state: 'FL', medianIncome: 38900, coordinates: { lat: 28.0253, lng: -82.4209 } },
  '33605': { zipCode: '33605', city: 'Tampa', state: 'FL', medianIncome: 35200, coordinates: { lat: 27.9614, lng: -82.4081 } },
  '33606': { zipCode: '33606', city: 'Tampa', state: 'FL', medianIncome: 78900, coordinates: { lat: 27.9419, lng: -82.5133 } },
  '33609': { zipCode: '33609', city: 'Tampa', state: 'FL', medianIncome: 82500, coordinates: { lat: 27.9428, lng: -82.4970 } },
  '33610': { zipCode: '33610', city: 'Tampa', state: 'FL', medianIncome: 45800, coordinates: { lat: 27.9767, lng: -82.4370 } },
  '33611': { zipCode: '33611', city: 'Tampa', state: 'FL', medianIncome: 52400, coordinates: { lat: 27.9128, lng: -82.5053 } },
  '33612': { zipCode: '33612', city: 'Tampa', state: 'FL', medianIncome: 51200, coordinates: { lat: 28.0275, lng: -82.4526 } },
  '33613': { zipCode: '33613', city: 'Tampa', state: 'FL', medianIncome: 68700, coordinates: { lat: 28.0731, lng: -82.4398 } },
  '33614': { zipCode: '33614', city: 'Tampa', state: 'FL', medianIncome: 55600, coordinates: { lat: 28.0078, lng: -82.5095 } },
  '33615': { zipCode: '33615', city: 'Tampa', state: 'FL', medianIncome: 62300, coordinates: { lat: 28.0170, lng: -82.5177 } },
  '33616': { zipCode: '33616', city: 'Tampa', state: 'FL', medianIncome: 58900, coordinates: { lat: 27.8853, lng: -82.5161 } },
  '33617': { zipCode: '33617', city: 'Tampa', state: 'FL', medianIncome: 64200, coordinates: { lat: 28.0739, lng: -82.4026 } },
  '33618': { zipCode: '33618', city: 'Tampa', state: 'FL', medianIncome: 71500, coordinates: { lat: 28.0678, lng: -82.5298 } },

  // Brandon / Riverview Area
  '33511': { zipCode: '33511', city: 'Brandon', state: 'FL', medianIncome: 63800, coordinates: { lat: 27.9378, lng: -82.2859 } },
  '33510': { zipCode: '33510', city: 'Brandon', state: 'FL', medianIncome: 71200, coordinates: { lat: 27.8825, lng: -82.2953 } },
  '33578': { zipCode: '33578', city: 'Riverview', state: 'FL', medianIncome: 68400, coordinates: { lat: 27.8658, lng: -82.3264 } },
  '33569': { zipCode: '33569', city: 'Riverview', state: 'FL', medianIncome: 75900, coordinates: { lat: 27.8270, lng: -82.2981 } },

  // St. Petersburg Area
  '33701': { zipCode: '33701', city: 'St. Petersburg', state: 'FL', medianIncome: 44200, coordinates: { lat: 27.7706, lng: -82.6394 } },
  '33702': { zipCode: '33702', city: 'St. Petersburg', state: 'FL', medianIncome: 38900, coordinates: { lat: 27.8008, lng: -82.6731 } },
  '33703': { zipCode: '33703', city: 'St. Petersburg', state: 'FL', medianIncome: 46700, coordinates: { lat: 27.8167, lng: -82.6403 } },
  '33704': { zipCode: '33704', city: 'St. Petersburg', state: 'FL', medianIncome: 41200, coordinates: { lat: 27.7881, lng: -82.7106 } },
  '33705': { zipCode: '33705', city: 'St. Petersburg', state: 'FL', medianIncome: 52800, coordinates: { lat: 27.7544, lng: -82.6781 } },
  '33706': { zipCode: '33706', city: 'St. Petersburg', state: 'FL', medianIncome: 48300, coordinates: { lat: 27.8278, lng: -82.7658 } },
  '33707': { zipCode: '33707', city: 'St. Petersburg', state: 'FL', medianIncome: 56400, coordinates: { lat: 27.7676, lng: -82.6403 } },
  '33710': { zipCode: '33710', city: 'St. Petersburg', state: 'FL', medianIncome: 61200, coordinates: { lat: 27.8167, lng: -82.6731 } },

  // Clearwater Area
  '33755': { zipCode: '33755', city: 'Clearwater', state: 'FL', medianIncome: 43900, coordinates: { lat: 27.9658, lng: -82.7331 } },
  '33756': { zipCode: '33756', city: 'Clearwater', state: 'FL', medianIncome: 48700, coordinates: { lat: 27.9947, lng: -82.7509 } },
  '33759': { zipCode: '33759', city: 'Clearwater', state: 'FL', medianIncome: 52300, coordinates: { lat: 27.9797, lng: -82.7870 } },
  '33760': { zipCode: '33760', city: 'Clearwater', state: 'FL', medianIncome: 54800, coordinates: { lat: 27.9786, lng: -82.8209 } },
  '33761': { zipCode: '33761', city: 'Clearwater', state: 'FL', medianIncome: 49200, coordinates: { lat: 28.0003, lng: -82.7356 } },
  '33763': { zipCode: '33763', city: 'Clearwater', state: 'FL', medianIncome: 58600, coordinates: { lat: 28.0358, lng: -82.7245 } },
  '33764': { zipCode: '33764', city: 'Clearwater', state: 'FL', medianIncome: 62100, coordinates: { lat: 27.9169, lng: -82.7831 } },
  '33765': { zipCode: '33765', city: 'Clearwater', state: 'FL', medianIncome: 64700, coordinates: { lat: 27.9659, lng: -82.8001 } },

  // Largo / Pinellas Park
  '33770': { zipCode: '33770', city: 'Largo', state: 'FL', medianIncome: 47800, coordinates: { lat: 27.9095, lng: -82.7873 } },
  '33771': { zipCode: '33771', city: 'Largo', state: 'FL', medianIncome: 51400, coordinates: { lat: 27.8886, lng: -82.7548 } },
  '33781': { zipCode: '33781', city: 'Pinellas Park', state: 'FL', medianIncome: 44600, coordinates: { lat: 27.8428, lng: -82.6995 } },

  // Dunedin / Palm Harbor
  '34698': { zipCode: '34698', city: 'Dunedin', state: 'FL', medianIncome: 58900, coordinates: { lat: 28.0200, lng: -82.7718 } },
  '34683': { zipCode: '34683', city: 'Palm Harbor', state: 'FL', medianIncome: 72400, coordinates: { lat: 28.0781, lng: -82.7623 } },
  '34684': { zipCode: '34684', city: 'Palm Harbor', state: 'FL', medianIncome: 68900, coordinates: { lat: 28.0828, lng: -82.7331 } },

  // Lutz / Land O Lakes
  '33549': { zipCode: '33549', city: 'Lutz', state: 'FL', medianIncome: 82100, coordinates: { lat: 28.1539, lng: -82.4612 } },
  '33558': { zipCode: '33558', city: 'Lutz', state: 'FL', medianIncome: 89500, coordinates: { lat: 28.1428, lng: -82.4526 } },
  '34639': { zipCode: '34639', city: 'Land O Lakes', state: 'FL', medianIncome: 76800, coordinates: { lat: 28.2189, lng: -82.4578 } },

  // Lakeland Area
  '33801': { zipCode: '33801', city: 'Lakeland', state: 'FL', medianIncome: 42100, coordinates: { lat: 28.0395, lng: -81.9498 } },
  '33803': { zipCode: '33803', city: 'Lakeland', state: 'FL', medianIncome: 46800, coordinates: { lat: 28.0656, lng: -81.9292 } },
  '33813': { zipCode: '33813', city: 'Lakeland', state: 'FL', medianIncome: 58700, coordinates: { lat: 28.1106, lng: -81.9681 } },

  // Orlando Area
  '32801': { zipCode: '32801', city: 'Orlando', state: 'FL', medianIncome: 41200, coordinates: { lat: 28.5383, lng: -81.3792 } },
  '32803': { zipCode: '32803', city: 'Orlando', state: 'FL', medianIncome: 52800, coordinates: { lat: 28.5447, lng: -81.3656 } },
  '32804': { zipCode: '32804', city: 'Orlando', state: 'FL', medianIncome: 38900, coordinates: { lat: 28.5628, lng: -81.3664 } },
  '32806': { zipCode: '32806', city: 'Orlando', state: 'FL', medianIncome: 36500, coordinates: { lat: 28.5322, lng: -81.3589 } },
  '32810': { zipCode: '32810', city: 'Orlando', state: 'FL', medianIncome: 43700, coordinates: { lat: 28.6128, lng: -81.4114 } },
  '32819': { zipCode: '32819', city: 'Orlando', state: 'FL', medianIncome: 62400, coordinates: { lat: 28.4631, lng: -81.4681 } },

  // Miami Area (for variety)
  '33101': { zipCode: '33101', city: 'Miami', state: 'FL', medianIncome: 35800, coordinates: { lat: 25.7617, lng: -80.1918 } },
  '33125': { zipCode: '33125', city: 'Miami', state: 'FL', medianIncome: 32400, coordinates: { lat: 25.7839, lng: -80.2336 } },
  '33130': { zipCode: '33130', city: 'Miami', state: 'FL', medianIncome: 42900, coordinates: { lat: 25.7539, lng: -80.1939 } },
  '33134': { zipCode: '33134', city: 'Miami', state: 'FL', medianIncome: 64200, coordinates: { lat: 25.7511, lng: -80.2864 } },
  '33137': { zipCode: '33137', city: 'Miami', state: 'FL', medianIncome: 52100, coordinates: { lat: 25.8128, lng: -80.1906 } },

  // Jacksonville Area (for variety)
  '32202': { zipCode: '32202', city: 'Jacksonville', state: 'FL', medianIncome: 44800, coordinates: { lat: 30.3322, lng: -81.6557 } },
  '32204': { zipCode: '32204', city: 'Jacksonville', state: 'FL', medianIncome: 38200, coordinates: { lat: 30.3089, lng: -81.6856 } },
  '32205': { zipCode: '32205', city: 'Jacksonville', state: 'FL', medianIncome: 45600, coordinates: { lat: 30.2994, lng: -81.7081 } },
  '32207': { zipCode: '32207', city: 'Jacksonville', state: 'FL', medianIncome: 68900, coordinates: { lat: 30.2939, lng: -81.5992 } },
  '32216': { zipCode: '32216', city: 'Jacksonville', state: 'FL', medianIncome: 72300, coordinates: { lat: 30.2572, lng: -81.5242 } },
};

// Helper function to get zip code data
export const getZipCodeData = (zipCode: string): ZipCodeData | undefined => {
  return zipCodeData[zipCode];
};

// Helper function to check if zip code exists
export const isValidZipCode = (zipCode: string): boolean => {
  return zipCode in zipCodeData;
};

// Helper function to get all zip codes in a city
export const getZipCodesByCity = (city: string): ZipCodeData[] => {
  return Object.values(zipCodeData).filter(z => z.city === city);
};

// Get all available cities
export const getAvailableCities = (): string[] => {
  return Array.from(new Set(Object.values(zipCodeData).map(z => z.city))).sort();
};
