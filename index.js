// 引入所需的库
const express = require('express');
const bodyParser = require('body-parser');
const CourseManager = require('course-manager-library');
const UserManager = require('user-manager-library');
const VideoTutorial = require('video-tutorial-library');
const LiveClassroom = require('live-classroom-library');
const QuizManager = require('quiz-manager-library');

// 初始化应用程序
const app = express();
app.use(bodyParser.json());

// 初始化课程管理器
const courseManager = new CourseManager();

// 初始化用户管理器
const userManager = new UserManager();

// 初始化视频教程
const videoTutorial = new VideoTutorial();

// 初始化直播教室
const liveClassroom = new LiveClassroom();

// 初始化测验管理器
const quizManager = new QuizManager();

// API端点：获取所有课程
app.get('/courses', (req, res) => {
  const courses = courseManager.getAllCourses();
  res.json(courses);
});

// API端点：获取课程详情
app.get('/courses/:id', (req, res) => {
  const courseId = req.params.id;
  const courseDetails = courseManager.getCourseDetails(courseId);
  res.json(courseDetails);
});

// API端点：注册用户
app.post('/users/register', (req, res) => {
  const userData = req.body;
  const newUser = userManager.registerUser(userData);
  res.json(newUser);
});

// API端点：登录用户
app.post('/users/login', (req, res) => {
  const { email, password } = req.body;
  const user = userManager.loginUser(email, password);
  res.json(user);
});

// API端点：播放视频教程
app.get('/video-tutorials/:id/play', (req, res) => {
  const videoId = req.params.id;
  const videoUrl = videoTutorial.getVideoUrl(videoId);
  res.redirect(videoUrl);
});

// API端点：加入直播教室
app.post('/live-classrooms/:id/join', (req, res) => {
  const classroomId = req.params.id;
  const user = req.body.user; // Assuming user data is sent in the request body
  const joinUrl = liveClassroom.joinClassroom(classroomId, user);
  res.redirect(joinUrl);
});

// API端点：开始测验
app.post('/quizzes/:id/start', (req, res) => {
  const quizId = req.params.id;
  const user = req.body.user; // Assuming user data is sent in the request body
  const quizSession = quizManager.startQuizSession(quizId, user);
  res.json(quizSession);
});

// 启动服务器
const port = 3000;
app.listen(port, () => {
  console.log(`在线课程平台运行在 http://localhost:${port}`);
});
