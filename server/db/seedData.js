// Make some arrays of objects based on schema design

// Users

const users = [
  {
    username: "ilovetodance",
    password: "dancer4lyfe",
    name: "Hermione Granger",
    accountCreationDate: "2022-07-25",
    subscriptionStatus: true,
  },
  {
    username: "ballerinagirl93",
    password: "pointYourToes",
    name: "Lavender Brown",
    accountCreationDate: "2019-02-16",
    subscriptionStatus: true,
  },
  {
    username: "bboy85",
    password: "iLoveToBattle25",
    name: "Seamus Finnigan",
    accountCreationDate: "2020-03-31",
    subscriptionStatus: false,
  },
];

// Instructors
const instructors = [
  {
    name: "Harper Watters",
    bio: "Harper Watters is a Ballet dancer from Houston, Texas. He’s well-known for not only his soloist performances in the Houston Ballet.",
    style: "ballet",
    imageURL:
      "https://steezy.imgix.net/instructors/harper-watters-col.jpg?w=300",
  },
  {
    name: "Bailey Sok",
    bio: "Bailey has trained in Industrial Dancing, Hip Hop, Ballet, Contemporary, and Jazz. She has choreographed for various Kpop groups.",
    style: "hip hop",
    imageURL: "https://steezy.imgix.net/instructors/bailey-sok-col.jpg?w=300",
  },
  {
    name: "Aliya Janell",
    bio: "Aliya Janell is an L.A. based professional dancer, choreographer, and content creator. Aliya launched her own dance experience Queens N’ Lettos to create a space for women to feel empowered, confident, and most of all sexy in their own skin.",
    style: "heels",
    imageURL: "https://steezy.imgix.net/instructors/aliya-janell-col.jpg?w=300",
  },
  {
    name: "Karen Chuang",
    bio: "Specializing in Contemporary, Karen has performed and taught in workshops all over the world. She has worked with artists including Nicki Minaj, Kanye West, Lady Gaga, Billie Eilish, and Carly Rae Jepson.",
    style: "contemporary",
    imageURL: "https://steezy.imgix.net/instructors/karen-chuang-col.jpg?w=300",
  },
  {
    name: "Marie Poppins",
    bio: "Marie “Poppins” Bonnevay first discovered Street Dance in her home country of France. She started training in Locking, Breaking, House, Waacking, Voguing and Choreography, but found her natural strength in Popping.",
    style: "popping",
    imageURL:
      "https://steezy.imgix.net/instructors/marie-poppins-col.jpg?w=300",
  },
];

// VideoLibrary

const videoLibraries = [
  {
    style: "hip hop",
    level: "beginner",
    videoURL: "https://dance.steezy.co/class/preview/2340",
  },
  {
    instructor_id: 5,
    style: "popping",
    level: "intermediate",
    videoURL: "https://dance.steezy.co/class/preview/513",
  },
  {
    instructor_id: 3,
    style: "heels",
    level: "advanced",
    videoURL: "https://dance.steezy.co/class/preview/2259",
  },
  {
    style: "hip hop",
    level: "advanced",
    videoURL: "https://dance.steezy.co/class/preview/60",
  },
  {
    style: "jazz funk",
    level: "advanced",
    videoURL: "https://dance.steezy.co/class/preview/562",
  },
];

// Subscription

const subscriptions = [
  { annual: true, monthly: false, studentDiscount: false },
  { annual: false, monthly: true, studentDiscount: true },
  { annual: true, monthly: false, studentDiscount: true },
];

module.exports = { users, instructors, videoLibraries, subscriptions };
