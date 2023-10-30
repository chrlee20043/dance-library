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
    name: "Aliya Janell",
    bio: "Aliya launched her own dance experience Queens N’ Lettos to create a space for women to feel empowered, confident, and most of all sexy in their own skin.",
    style: "heels",
    imageURL: "https://steezy.imgix.net/instructors/aliya-janell-col.jpg?w=300",
    submitted_by: 2,
  },
  {
    name: "Karen Chuang",
    bio: "Specializing in Contemporary, Karen has performed and taught in workshops all over the world. She has worked with artists including Nicki Minaj, Kanye West, Lady Gaga, Billie Eilish, and Carly Rae Jepson.",
    style: "contemporary",
    imageURL: "https://steezy.imgix.net/instructors/karen-chuang-col.jpg?w=300",
    submitted_by: 2,
  },
  {
    name: "Marie Poppins",
    bio: "Marie “Poppins” Bonnevay first discovered Street Dance in her home country of France. She started training in Locking, Breaking, House, Waacking, Voguing and Choreography, but found her natural strength in Popping.",
    style: "popping",
    imageURL:
      "https://steezy.imgix.net/instructors/marie-poppins-col.jpg?w=300",
    submitted_by: 2,
  },
  {
    name: "Brian Friedman",
    bio: "Brian is widely known for his choreography credits including Britney Spears, Beyoncé, Cher, and Mariah Carey.",
    style: "Jazz Funk",
    imageURL:
      "https://steezy.imgix.net/instructors/brian-friedman-col.jpg?w=300",
    submitted_by: 3,
  },
  {
    name: "Bailey Sok",
    bio: "Bailey started training in various styles including hip hop and ballet and is now a choreographer for various KPOP groups.",
    style: "Hip Hop",
    imageURL: "https://steezy.imgix.net/instructors/bailey-sok-col.jpg?w=300",
    submitted_by: 3,
  },
  {
    name: "Cheshir Ha",
    bio: "Cheshir rose to fame while working directly with Lisa of BLACKPINK, acting as her personal choreographer, dance teacher, and video director.",
    style: "Hip Hop",
    imageURL: "https://steezy.imgix.net/instructors/cheshir-ha-col.jpg?w=300",
    submitted_by: 3,
  },
];

// Classes

const videoClasses = [
  {
    instructor_id: 2,
    instructor_name: "Karen Chuang",
    style: "contemporary",
    level: "beginner",
    videoURL: "https://www.youtube.com/embed/J_wT_eRYksY?si=hSlAdEM1iUKS_ECb",
    submitted_by: 2,
  },
  {
    instructor_id: 2,
    instructor_name: "Karen Chuang",
    style: "contemporary",
    level: "intermediate",
    videoURL: "https://www.youtube.com/embed/W7Ec6mFHaF4?si=bsaybVJUMtDqeu5s",
    submitted_by: 2,
  },
  {
    instructor_id: 2,
    instructor_name: "Karen Chuang",
    style: "contemporary",
    level: "intermediate",
    videoURL: "https://www.youtube.com/embed/bCHq2pdRoio?si=iK4a77o0LbMw1WxO",
    submitted_by: 2,
  },
  {
    instructor_id: 1,
    instructor_name: "Aliya Janell",
    style: "heels",
    level: "advanced",
    videoURL: "https://www.youtube.com/embed/UfP9ifDmZIM?si=nXzJUMV4ciHx0lVo",
    submitted_by: 2,
  },
  {
    instructor_id: 1,
    instructor_name: "Aliya Janell",
    style: "heels",
    level: "advanced",
    videoURL: "https://www.youtube.com/embed/8gsveSEujwY?si=8H0f-SavlyTUvKqF",
    submitted_by: 2,
  },
  {
    instructor_id: 1,
    instructor_name: "Aliya Janell",
    style: "heels",
    level: "advanced",
    videoURL: "https://www.youtube.com/embed/zUSvieorPGk?si=TBul3JFBoCJMH7yR",
    submitted_by: 2,
  },
  {
    instructor_id: 3,
    instructor_name: "Marie Poppins",
    style: "popping",
    level: "intermediate",
    videoURL: "https://www.youtube.com/embed/QInF2xm3qz4?si=kGie_5nbRvU6amsY",
    submitted_by: 2,
  },
  {
    instructor_id: 3,
    instructor_name: "Marie Poppins",
    style: "popping",
    level: "intermediate",
    videoURL: "https://www.youtube.com/embed/VyRJ9nSfPiM?si=MU998t6Zkpacev9A",
    submitted_by: 2,
  },
  {
    instructor_id: 3,
    instructor_name: "Marie Poppins",
    style: "popping",
    level: "intermediate",
    videoURL: "https://www.youtube.com/embed/064_kOe-9Y0?si=8L03ESWACcPglN4v",
    submitted_by: 2,
  },
  {
    instructor_id: 4,
    instructor_name: "Brian Friedman",
    style: "Jazz Funk",
    level: "intermediate",
    videoURL: "https://www.youtube.com/embed/yCUig4Vtvv4?si=enj3ymeFF4MYu4jT",
    submitted_by: 3,
  },
  {
    instructor_id: 4,
    instructor_name: "Brian Friedman",
    style: "Jazz Funk",
    level: "advanced",
    videoURL: "https://www.youtube.com/embed/Y8SlGJdY_4U?si=vXV2wR_bALofvTv1",
    submitted_by: 3,
  },
  {
    instructor_id: 4,
    instructor_name: "Brian Friedman",
    style: "Jazz Funk",
    level: "advanced",
    videoURL: "https://www.youtube.com/embed/nJlfjwgujc8?si=03VitGq6RhrXwlgl",
    submitted_by: 3,
  },
  {
    instructor_id: 5,
    instructor_name: "Bailey Sok",
    style: "hip hop",
    level: "advanced",
    videoURL: "https://www.youtube.com/embed/ZG920z709sU?si=K8LgN-VZAC3BqvZR",
    submitted_by: 3,
  },
  {
    instructor_id: 5,
    instructor_name: "Bailey Sok",
    style: "hip hop",
    level: "advanced",
    videoURL: "https://www.youtube.com/embed/3fiEn2DBZEY?si=1QA-lDASNT5YaGv9",
    submitted_by: 3,
  },
  {
    instructor_id: 5,
    instructor_name: "Bailey Sok",
    style: "hip hop",
    level: "advanced",
    videoURL: "https://www.youtube.com/embed/4V_Uuf_cjFA?si=DynZC6hdckvLLayN",
    submitted_by: 3,
  },
  {
    instructor_id: 6,
    instructor_name: "Cheshir Ha",
    style: "hip hop",
    level: "intermediate",
    videoURL: "https://www.youtube.com/embed/va2psFTJuq4?si=RIC_qMavjB41PibA",
    submitted_by: 3,
  },
  {
    instructor_id: 6,
    instructor_name: "Cheshir Ha",
    style: "hip hop",
    level: "advanced",
    videoURL: "https://www.youtube.com/embed/fwHHoMpIOqE?si=N6PxBPIVJyfRXWiH",
    submitted_by: 3,
  },
  {
    instructor_id: 6,
    instructor_name: "Cheshir Ha",
    style: "hip hop",
    level: "intermediate",
    videoURL: "https://www.youtube.com/embed/nZSWwMkphOk?si=QOj_a1B5QN9oNQgz",
    submitted_by: 3,
  },
];

// Subscription

const subscriptions = [
  { user_id: 1, annual: true, monthly: false, studentDiscount: false },
  { user_id: 2, annual: false, monthly: true, studentDiscount: true },
  { user_id: 3, annual: false, monthly: false, studentDiscount: false },
];

const favorites = [
  { favoriteId: 1, userId: 1, videoId: 1 },
  { favoriteId: 2, userId: 1, videoId: 2 },
];

module.exports = { users, instructors, videoClasses, subscriptions, favorites };
