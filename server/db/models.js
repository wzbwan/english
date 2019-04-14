var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;


var SentenceSchema =  new mongoose.Schema({
    title: String,              // 句子标题：可以写日期、或者此句子是为了某一个单词、语法点的例句。
    en: String,                 // 英文
    ch: String,                 // 中文（翻译）
    chapterId: ObjectId,        // 隶属于某章节
    count: Number,              // 复习次数
})

var ChapterSchema = new mongoose.Schema({
    bookId: ObjectId,           // 隶属于某本书
    name: String,               // 章节名称：unit1 / 4月 / 辛普森S28E12 / 美国往事22:12-35:45 
})

var BookSchema =  new mongoose.Schema({
    name: String,               // 书名 / 剧集名 / 电影名 等
})

// var StudentSchema = new mongoose.Schema({
//     studentId: String,                  // 学号
//     passwd: String,                     // 口令
//     name: String,                       // 姓名
//     gender: Boolean,                    // 性别
//     star: Number,                       // 星
// })

// var TeacherSchema =  new mongoose.Schema({
//     phone: String,
//     passwd: String,
//     name: String,
//     gender: Boolean,
//     courseSelected:ObjectId,
//     delete: Number,
// })

// var CourseSchema =  new mongoose.Schema({
//     name: String,
//     teacher: ObjectId,
//     members:[ObjectId],
//     term:String,
//     sections:[]
// })

// var TeamSchema = new mongoose.Schema({
//     sortName: String,
//     course:ObjectId,
//     name:String,
//     slogan:String,
//     leader:ObjectId,
//     members:[],
//     score:Number,
// })

// var RecordTypeSchema = new mongoose.Schema({
//     title: String,                      // 纪律条例
//     course: ObjectId,                   // 课程Id
//     star: Number,                      // 加（扣）分
// })

// var RecordSchema = new mongoose.Schema({
//     student: ObjectId,                  // 学生ID
//     course: ObjectId,                   //课程Id
//     type: String,                       // 违反条例
//     star: Number,                       // 扣分
//     record: String,                     // 详细记录
//     date: Date,                         // 违反日期
// })

// var RecordTeamSchema = new mongoose.Schema({
//     team: ObjectId,                     // 组ID
//     type: String,                       // 违反条例
//     score: Number,                      // 扣分
//     record: String,                     // 详细记录
//     date: Date,                         // 违反日期
// })



module.exports = {
    book: BookSchema,
    chapter: ChapterSchema,
    sentence: SentenceSchema,

    // student: StudentSchema,
    // teacher: TeacherSchema,
    // course: CourseSchema,
    // team: TeamSchema,
    // recordType: RecordTypeSchema,
    // record: RecordSchema,
    // recordTeam: RecordTeamSchema,
}