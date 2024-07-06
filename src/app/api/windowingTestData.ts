const mockPlaces = [
  {
    name: 'Cafe Mocha',
    images: ['/testimage.PNG'],
    description: 'A cozy place to enjoy coffee and snacks.',
    address: '123 Coffee St, Caffeine City',
    id: '1',
  },
  {
    name: 'Book Nook',
    images: ['/testimage.PNG'],
    description: 'Find your next read in a peaceful environment.',
    address: '456 Literature Ln, Reading Town',
    id: '2',
  },
  {
    name: 'Sunny Park',
    images: ['/testimage.PNG'],
    description: 'A great spot for outdoor activities and relaxation.',
    address: '789 Sunshine Blvd, Happyville',
    id: '3',
  },
  // 추가 데이터 생성
  ...Array.from({ length: 50 }, (_, index) => ({
    name: `Mock Place ${index + 4}`,
    images: ['/testimage.PNG'],
    description: `Description for Mock Place ${index + 4}`,
    address: `Address for Mock Place ${index + 4}`,
    id: `${index + 4}`,
  })),
]

export default mockPlaces
