import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  BookOpen, Award, Zap, Flame, Clock, Upload, FileText, CheckCircle2,
  XCircle, HelpCircle, ChevronRight, ChevronLeft, RotateCcw, Sparkles,
  Brain, Target, Layers, Filter, Search, Plus, Trash2, Edit3, Eye,
  Trophy, BarChart3, Bookmark, AlertTriangle, Play, Pause, Volume2,
  Check, X, ArrowRight, SplitSquareVertical, ListChecks, PenTool,
  GraduationCap, ShieldAlert, Star, Lightbulb, RefreshCw, Download
} from 'lucide-react';

// ============================================================================
// COMPREHENSIVE DATASET EXTRACTED 100% FROM ĐỀ 1, ĐỀ 2, ĐỀ 3
// ============================================================================

const INITIAL_QUESTIONS = [
  // ======================== ĐỀ 1: GRAMMAR & STRUCTURES ========================
  {
    id: 'd1-g-1', examId: 'DE1', category: 'GRAMMAR', type: 'mcq',
    prompt: '1. The doctor insisted that his patient ________.',
    options: [
      'A. take it easy inside of three months',
      'B. takes it easy inside of three months',
      'C. to take some vacation for three months',
      'D. did not work too hard for three months'
    ],
    answer: 'A',
    explanation: 'Cấu trúc giả định (Subjunctive Mood): insist that + S + (should) + V_inf. "take it easy" = nghỉ ngơi, thư giãn.'
  },
  {
    id: 'd1-g-2', examId: 'DE1', category: 'GRAMMAR', type: 'mcq',
    prompt: '2. ________ these creatures be able to survive.',
    options: [
      'A. Exactly in the right conditions can',
      'B. Only the right conditions will',
      'C. Only in the right conditions can',
      'D. Only in exactly the right conditions will'
    ],
    answer: 'D',
    explanation: 'Đảo ngữ với "Only in + cụm giới từ": Only in exactly the right conditions + will + S + be able to V (chú ý phía sau có "be able to" nên dùng trợ động từ "will", không dùng "can" đi với "be able to").'
  },
  {
    id: 'd1-g-3', examId: 'DE1', category: 'GRAMMAR', type: 'mcq',
    prompt: '3. ________ saying was so important that I asked everyone to stop talking and listen.',
    options: [
      'A. What was the woman',
      'B. What the woman was',
      'C. That the woman was',
      'D. The woman was'
    ],
    answer: 'B',
    explanation: 'Mệnh đề danh ngữ (Noun Clause) làm chủ ngữ: "What the woman was saying" (Những gì người phụ nữ đang nói).'
  },
  {
    id: 'd1-g-4', examId: 'DE1', category: 'GRAMMAR', type: 'mcq',
    prompt: "4. It's a pity that we didn't visit Tom when we had the chance, I would like ________ him before he left the country.",
    options: ['A. having seen', 'B. to see', 'C. seeing', 'D. to have seen'],
    answer: 'D',
    explanation: 'would like + to have P2: diễn tả một mong muốn trong quá khứ nhưng đã không thực hiện được (tiếc nuối).'
  },
  {
    id: 'd1-g-6', examId: 'DE1', category: 'GRAMMAR', type: 'mcq',
    prompt: '6. Standing on the tip of the cape, ________.',
    options: [
      'A. people have seen a lighthouse far away',
      'B. lies a lighthouse in the middle of the sea',
      'C. we can see the lighthouse in the distance',
      'D. a lighthouse can be seen from the distance'
    ],
    answer: 'C',
    explanation: 'Rút gọn mệnh đề cùng chủ ngữ dùng V-ing: Chủ ngữ của "Standing on the tip of the cape" phải là người ("we"), tránh lỗi Dangling Participle.'
  },
  {
    id: 'd1-g-7', examId: 'DE1', category: 'GRAMMAR', type: 'mcq',
    prompt: "7. ________ visit the British Museum while you are in London, you mustn't forget to look at the famous Rosetta Stone.",
    options: ['A. Unless you', 'B. For fear that you', 'C. When you might', 'D. Should you'],
    answer: 'D',
    explanation: 'Đảo ngữ câu điều kiện loại 1: Should + S + V_inf = If you should visit...'
  },
  {
    id: 'd1-g-8', examId: 'DE1', category: 'GRAMMAR', type: 'mcq',
    prompt: "8. The next bus doesn't come for another hour, so we ________ walk. That's the best solution for now.",
    options: ['A. could possibly', 'B. might as well', 'C. probably may', 'D. may at least'],
    answer: 'B',
    explanation: 'Cấu trúc "might as well + V_inf": chẳng thà làm gì đó (vì không có lựa chọn nào tốt hơn trong tình huống hiện tại).'
  },
  {
    id: 'd1-g-9', examId: 'DE1', category: 'GRAMMAR', type: 'mcq',
    prompt: "9. I'd sooner ________ to bed early last night.",
    options: ['A. have gone', 'B. going', 'C. I went', 'D. go'],
    answer: 'A',
    explanation: 'would sooner + have P2 (khi cùng chủ ngữ, ở quá khứ "last night"): muốn đã làm gì trong quá khứ.'
  },
  {
    id: 'd1-g-10', examId: 'DE1', category: 'GRAMMAR', type: 'mcq',
    prompt: '10. You may hear the fire alarm, ________ you should proceed quickly and quietly to the nearest fire exit.',
    options: ['A. despite which', 'B. whenever', 'C. in which event', 'D. for when'],
    answer: 'C',
    explanation: '"in which event" = in which case (trong trường hợp đó - thay thế cho cả mệnh đề nghe thấy chuông báo cháy).'
  },

  // ======================== ĐỀ 3: GRAMMAR & STRUCTURES ========================
  {
    id: 'd3-g-1', examId: 'DE3', category: 'GRAMMAR', type: 'mcq',
    prompt: '1. The assistant director recommended that Kenichi ________ to the New York office.',
    options: ['A. be transferred', 'B. transferring', 'C. is transferred', 'D. to transfer'],
    answer: 'A',
    explanation: 'Thể giả định bị động (Passive Subjunctive): recommend that + S + (should) be + P2.'
  },
  {
    id: 'd3-g-2', examId: 'DE3', category: 'GRAMMAR', type: 'mcq',
    prompt: '2. ________ over long distances is a fact.',
    options: [
      'A. That electricity transmitting',
      'B. That electricity can be transmitted',
      'C. That electricity',
      'D. That can be transmitted'
    ],
    answer: 'B',
    explanation: 'Mệnh đề danh ngữ bắt đầu bằng "That + S + V" làm chủ ngữ của động từ "is".'
  },
  {
    id: 'd3-g-3', examId: 'DE3', category: 'GRAMMAR', type: 'mcq',
    prompt: '3. Mrs. Lincon has ________ that she is unable to get a job.',
    options: [
      'A. such small education',
      'B. so little education',
      'C. such little education',
      'D. so small education'
    ],
    answer: 'B',
    explanation: 'so + little + N(không đếm được) + that... ("education" là danh từ không đếm được).'
  },
  {
    id: 'd3-g-5', examId: 'DE3', category: 'GRAMMAR', type: 'mcq',
    prompt: '5. By cutting down the trees, people destroy the ecosystem of the rain forest ________.',
    options: [
      'A. on where they depend',
      'B. on which they depend',
      'C. whom they depend on',
      'D. whose they depend on'
    ],
    answer: 'B',
    explanation: 'depend on + which -> đưa giới từ lên trước đại từ quan hệ: "on which they depend".'
  },
  {
    id: 'd3-g-7', examId: 'DE3', category: 'GRAMMAR', type: 'mcq',
    prompt: '7. Indoor heating systems have made ________ for people to live and work comfortably in temperate climates.',
    options: ['A. possible that', 'B. it possible', 'C. possible', 'D. it is possible'],
    answer: 'B',
    explanation: 'Cấu trúc tân ngữ giả: make + it + adj (possible) + (for sb) + to V.'
  },
  {
    id: 'd3-g-9', examId: 'DE3', category: 'GRAMMAR', type: 'mcq',
    prompt: "9. She's angry about ________ to the farewell party last night.",
    options: [
      'A. not having invited',
      'B. not to have invited',
      'C. not having been invited',
      'D. not to have been invited'
    ],
    answer: 'C',
    explanation: 'Sau giới từ "about" dùng Danh động từ hoàn thành bị động: not having been P2 (vì xảy ra tối qua và mang nghĩa bị động).'
  },
  {
    id: 'd3-g-10', examId: 'DE3', category: 'GRAMMAR', type: 'mcq',
    prompt: "10. That isn't Bill driving, ________?",
    options: ['A. is he', 'B. isn\'t he', 'C. is it', 'D. isn\'t it'],
    answer: 'C',
    explanation: 'Câu hỏi đuôi với chủ ngữ "That" -> đổi thành "it". Mệnh đề chính phủ định -> đuôi khẳng định: "is it?".'
  },

  // ======================== PHRASAL VERBS & PREPOSITIONS (ĐỀ 1, 2, 3) ========================
  {
    id: 'd1-pv-11', examId: 'DE1', category: 'PHRASAL_VERBS', type: 'mcq',
    prompt: '11. ASEAN is ________ to promote economic development and cultural diversity among its member states.',
    options: ['A. cut down', 'B. set up', 'C. taken over', 'D. found out'],
    answer: 'B',
    explanation: 'set up = establish (thành lập).'
  },
  {
    id: 'd1-pv-12', examId: 'DE1', category: 'PHRASAL_VERBS', type: 'mcq',
    prompt: '12. She believes that all countries should ________ the death penalty as it is inhumane.',
    options: ['A. catch up on', 'B. put down to', 'C. get down to', 'D. do away with'],
    answer: 'D',
    explanation: 'do away with = abolish, get rid of (bãi bỏ, xóa bỏ án tử hình).'
  },
  {
    id: 'd1-pv-13', examId: 'DE1', category: 'PHRASAL_VERBS', type: 'mcq',
    prompt: '13. In 2003, Le Thanh Thuy was diagnosed ________ bone cancer and doctors decided to amputate her leg to save her life.',
    options: ['A. with', 'B. on', 'C. by', 'D. about'],
    answer: 'A',
    explanation: 'be diagnosed with + căn bệnh: được chẩn đoán mắc bệnh gì.'
  },
  {
    id: 'd1-pv-14', examId: 'DE1', category: 'PHRASAL_VERBS', type: 'mcq',
    prompt: "14. I'm going to have to ________ my spoken German before I go to Munich.",
    options: ['A. face up to', 'B. creep up on', 'C. read up about', 'D. brush up on'],
    answer: 'D',
    explanation: 'brush up on sth = ôn lại, trau dồi lại một kỹ năng/ngôn ngữ đã lâu không dùng.'
  },
  {
    id: 'd1-pv-16', examId: 'DE1', category: 'PHRASAL_VERBS', type: 'mcq',
    prompt: '16. She was ________ an array of questions during the interview yesterday.',
    options: ['A. put through', 'B. put over', 'C. put up with', 'D. put forward'],
    answer: 'A',
    explanation: 'put sb through sth = bắt ai phải trải qua một thử thách/loạt câu hỏi gay gắt.'
  },
  {
    id: 'd1-pv-17', examId: 'DE1', category: 'PHRASAL_VERBS', type: 'mcq',
    prompt: '17. The actor ________ the last word of the slogan so it would make a lasting impression on the listening audience.',
    options: ['A. got through', 'B. caught up', 'C. took over', 'D. drew out'],
    answer: 'D',
    explanation: 'draw out = kéo dài âm/từ ra để tạo ấn tượng.'
  },
  {
    id: 'd1-pv-18', examId: 'DE1', category: 'PHRASAL_VERBS', type: 'mcq',
    prompt: '18. Having ________ a lot of problems at work, my father came home tired but happy.',
    options: ['A. broken into', 'B. got through', 'C. come up against', 'D. brought round'],
    answer: 'B',
    explanation: 'get through = vượt qua, giải quyết xong xuôi (vì về nhà mệt nhưng "happy").'
  },
  {
    id: 'd1-pv-19', examId: 'DE1', category: 'PHRASAL_VERBS', type: 'mcq',
    prompt: '19. My husband always gives ________ to me when we have an argument.',
    options: ['A. out', 'B. on', 'C. off', 'D. in'],
    answer: 'D',
    explanation: 'give in (to sb) = nhượng bộ, chịu thua ai.'
  },
  {
    id: 'd2-pv-4', examId: 'DE2', category: 'PHRASAL_VERBS', type: 'mcq',
    prompt: '4. ________ predators such as grizzly bears could throw the ecosystem out of balance.',
    options: ['A. Killing off', 'B. Cutting off', 'C. Turning off', 'D. Getting off'],
    answer: 'A',
    explanation: 'kill off = tiêu diệt hàng loạt, tận diệt.'
  },
  {
    id: 'd2-pv-5', examId: 'DE2', category: 'PHRASAL_VERBS', type: 'mcq',
    prompt: '5. It is an embarrassing situation, but she managed to ________.',
    options: ['A. laugh at it', 'B. laugh on it', 'C. laugh it off', 'D. laugh it out'],
    answer: 'C',
    explanation: 'laugh sth off = cười xòa cho qua chuyện ngượng ngùng.'
  },
  {
    id: 'd2-pv-7', examId: 'DE2', category: 'PHRASAL_VERBS', type: 'mcq',
    prompt: '7. The elaborate bridal costumes of the coastal Indians are ________ from mother to daughter.',
    options: ['A. taken after', 'B. put by', 'C. parted with', 'D. handed down'],
    answer: 'D',
    explanation: 'hand down = truyền lại từ thế hệ này sang thế hệ khác.'
  },
  {
    id: 'd2-pv-10', examId: 'DE2', category: 'PHRASAL_VERBS', type: 'mcq',
    prompt: '10. The ceiling fans were on but unfortunately they only ________ the hot, humid air.',
    options: ['A. stirred up', 'B. poured through', 'C. turned into', 'D. cut back'],
    answer: 'A',
    explanation: 'stir up = khuấy động không khí nóng ẩm lên.'
  },
  {
    id: 'd3-pv-1', examId: 'DE3', category: 'PHRASAL_VERBS', type: 'mcq',
    prompt: '1. He went ________ a bad cold just before Christmas.',
    options: ['A. down with', 'B. in for', 'C. over', 'D. through'],
    answer: 'A',
    explanation: 'go down with + bệnh = bị nhiễm bệnh, đổ bệnh.'
  },
  {
    id: 'd3-pv-3', examId: 'DE3', category: 'PHRASAL_VERBS', type: 'mcq',
    prompt: "3. David's wife is a terrible snob. She ________ almost all his friends because they have north country accents.",
    options: ['A. looks up to', 'B. looks down on', 'C. looks forward to', 'D. looks out on'],
    answer: 'B',
    explanation: 'look down on sb = coi thường, khinh rẻ ai.'
  },
  {
    id: 'd3-pv-9', examId: 'DE3', category: 'PHRASAL_VERBS', type: 'mcq',
    prompt: '9. Bad living conditions ________ social and welfare problems.',
    options: ['A. give rise to', 'B. give into', 'C. rise through', 'D. take the rise out of'],
    answer: 'A',
    explanation: 'give rise to sth = gây ra, dẫn đến (cause/lead to).'
  },

  // ======================== VOCABULARY, IDIOMS & COLLOCATIONS ========================
  {
    id: 'd1-v-21', examId: 'DE1', category: 'VOCABULARY', type: 'mcq',
    prompt: '21. His excuse for being late sounded like a ________ story. How ridiculous!',
    options: ['A. thought-provoking', 'B. mind-boggling', 'C. well-rounded', 'D. far-fetched'],
    answer: 'D',
    explanation: 'far-fetched = khó tin, vô lý, bịa đặt.'
  },
  {
    id: 'd1-v-22', examId: 'DE1', category: 'VOCABULARY', type: 'mcq',
    prompt: '22. There seems to be a large ________ between the number of people employed in service industries and those employed in the primary sectors.',
    options: ['A. disruption', 'B. discretion', 'C. discrepancy', 'D. discrimination'],
    answer: 'C',
    explanation: 'discrepancy (between A and B) = sự chênh lệch, khác biệt về số liệu.'
  },
  {
    id: 'd1-v-25', examId: 'DE1', category: 'VOCABULARY', type: 'mcq',
    prompt: "25. I won't buy that car because it has too much ________ on it.",
    options: ['A. ups and downs', 'B. white tie', 'C. wear and tear', 'D. odds and ends'],
    answer: 'C',
    explanation: 'wear and tear = sự hao mòn tự nhiên do sử dụng nhiều.'
  },
  {
    id: 'd1-v-26', examId: 'DE1', category: 'VOCABULARY', type: 'mcq',
    prompt: '26. She went to college to study history, but changed ________ and is now a doctor.',
    options: ['A. for a better', 'B. her tune', 'C. horses in midstream', 'D. hands'],
    answer: 'C',
    explanation: 'Idiom "change horses in midstream": thay đổi kế hoạch/ngành học/quyết định lớn giữa chừng.'
  },
  {
    id: 'd1-v-27', examId: 'DE1', category: 'VOCABULARY', type: 'mcq',
    prompt: "27. Yes, I saw the last episode of the series, but I'm none the ________ about what really happened.",
    options: ['A. better', 'B. wiser', 'C. cleverer', 'D. surer'],
    answer: 'B',
    explanation: 'Idiom "be none the wiser": vẫn không hiểu thêm được chút nào dù đã xem/nghe giải thích.'
  },
  {
    id: 'd1-v-29', examId: 'DE1', category: 'VOCABULARY', type: 'mcq',
    prompt: '29. The professor looked as if he were ________ away in a world of his own.',
    options: ['A. yards', 'B. kilometers', 'C. miles', 'D. streets'],
    answer: 'C',
    explanation: 'Idiom "be miles away": đang lơ đãng, tâm hồn treo ngược cành cây.'
  },
  {
    id: 'd1-v-30', examId: 'DE1', category: 'VOCABULARY', type: 'mcq',
    prompt: '30. For stamps and coins to be of value, they need to be in mint ________.',
    options: ['A. state', 'B. condition', 'C. situation', 'D. appearance'],
    answer: 'B',
    explanation: 'Collocation "in mint condition": còn mới nguyên, hoàn hảo như vừa xuất xưởng.'
  },
  {
    id: 'd1-v-31', examId: 'DE1', category: 'VOCABULARY', type: 'mcq',
    prompt: "31. There's been a slight improvement in his health, but he's not out of the ________ yet.",
    options: ['A. bushes', 'B. woods', 'C. hands', 'D. reaches'],
    answer: 'B',
    explanation: 'Idiom "out of the woods": thoát khỏi tình trạng nguy hiểm/khó khăn.'
  },
  {
    id: 'd1-v-32', examId: 'DE1', category: 'VOCABULARY', type: 'mcq',
    prompt: "32. He's unreliable at the best of times, but forgetting my birthday was the last ________.",
    options: ['A. drop', 'B. breath', 'C. straw', 'D. despair'],
    answer: 'C',
    explanation: 'Idiom "the last straw": giọt nước tràn ly.'
  },
  {
    id: 'd1-v-33', examId: 'DE1', category: 'VOCABULARY', type: 'mcq',
    prompt: '33. The workforce has been pared to the ________.',
    options: ['A. quick', 'B. fruit', 'C. ball', 'D. bone'],
    answer: 'D',
    explanation: 'Idiom "pare sth to the bone": cắt giảm đến mức tối thiểu.'
  },
  {
    id: 'd1-v-34', examId: 'DE1', category: 'VOCABULARY', type: 'mcq',
    prompt: "34. I don't know if Ash would be right for the job; he's a bit of an unknown ________.",
    options: ['A. quality', 'B. qualification', 'C. quantity', 'D. identity'],
    answer: 'C',
    explanation: 'Idiom "an unknown quantity": một nhân tố bí ẩn (chưa rõ năng lực thực sự ra sao).'
  },
  {
    id: 'd1-v-35', examId: 'DE1', category: 'VOCABULARY', type: 'mcq',
    prompt: "35. She now says she didn't really want the job that she failed to get, but I think it's just ________.",
    options: ['A. a cup of tea', 'B. an act', 'C. full of beans', 'D. sour grapes'],
    answer: 'D',
    explanation: 'Idiom "sour grapes" (nho còn xanh lắm):假 vờ chê bai thứ mình không đạt được.'
  },
  {
    id: 'd1-v-37', examId: 'DE1', category: 'VOCABULARY', type: 'mcq',
    prompt: '37. I like my new job; the only fly in the ________ is the fact that I have to work every other weekend.',
    options: ['A. fat', 'B. porridge', 'C. soup', 'D. ointment'],
    answer: 'D',
    explanation: 'Idiom "a fly in the ointment": con sâu làm rầu nồi canh (một điểm trừ nhỏ làm giảm sự hoàn hảo).'
  },
  {
    id: 'd1-v-38', examId: 'DE1', category: 'VOCABULARY', type: 'mcq',
    prompt: '38. Hardship and hard work are very much part and ________ of student life.',
    options: ['A. package', 'B. parcel', 'C. province', 'D. section'],
    answer: 'B',
    explanation: 'Idiom "part and parcel of sth": phần tất yếu không thể tách rời.'
  },
  {
    id: 'd2-v-1', examId: 'DE2', category: 'VOCABULARY', type: 'mcq',
    prompt: '1 (Đề 2). Job losses are mainly in the ________ sectors of the industry.',
    options: ['A. high-collar', 'B. stiff-collar', 'C. blue-collar', 'D. red-collar'],
    answer: 'C',
    explanation: 'blue-collar: lao động chân tay / công nhân sản xuất.'
  },
  {
    id: 'd2-v-7', examId: 'DE2', category: 'VOCABULARY', type: 'mcq',
    prompt: '7 (Đề 2). It was a ________ of luck that June was available when the job came up.',
    options: ['A. blow', 'B. stroke', 'C. brush', 'D. touch'],
    answer: 'B',
    explanation: 'a stroke of luck: một vận may bất ngờ.'
  },
  {
    id: 'd2-v-10', examId: 'DE2', category: 'VOCABULARY', type: 'mcq',
    prompt: "10 (Đề 2). I don't think you have been watering the plants near the gate. The soil is ________.",
    options: ['A. as dry as rice', 'B. as dry as a tile', 'C. as dry as a bone', 'D. as dry as wood'],
    answer: 'C',
    explanation: 'Simile "as dry as a bone": khô cong, khô khốc.'
  },
  {
    id: 'd2-v-12', examId: 'DE2', category: 'VOCABULARY', type: 'mcq',
    prompt: '12 (Đề 2). "When will you be informed of the test results?" "Not until Monday, so I\'ll be ________ all weekend."',
    options: ['A. at needles and pins', 'B. on pins and needles', 'C. on needles and pins', 'D. at pins and needles'],
    answer: 'B',
    explanation: 'Idiom "on pins and needles": thấp thỏm, hồi hộp lo âu như ngồi trên đống lửa.'
  },
  {
    id: 'd2-v-14', examId: 'DE2', category: 'VOCABULARY', type: 'mcq',
    prompt: "14 (Đề 2). Life's very easy for you. You were born with a ________ spoon in your mouth.",
    options: ['A. silver', 'B. golden', 'C. bronze', 'D. diamond'],
    answer: 'A',
    explanation: 'born with a silver spoon in one\'s mouth: sinh ra ở vạch đích, gia đình giàu có.'
  },
  {
    id: 'd2-v-18', examId: 'DE2', category: 'VOCABULARY', type: 'mcq',
    prompt: "18 (Đề 2). Don't mention work to Ray, as it's a sore ________ with him at the moment.",
    options: ['A. finger', 'B. point', 'C. place', 'D. nail'],
    answer: 'B',
    explanation: 'a sore point: vấn đề nhạy cảm dễ gây buồn/tức giận khi nhắc tới.'
  },
  {
    id: 'd2-syn-4', examId: 'DE2', category: 'VOCABULARY', type: 'mcq',
    prompt: '[CLOSEST] 4 (Đề 2). I could see the finish line and thought I was **home and dry**.',
    options: ['A. hopeless', 'B. hopeful', 'C. successful', 'D. unsuccessful'],
    answer: 'C',
    explanation: 'Idiom "home and dry" = đã nắm chắc phần thắng, thành công mỹ mãn.'
  },
  {
    id: 'd2-syn-10', examId: 'DE2', category: 'VOCABULARY', type: 'mcq',
    prompt: '[CLOSEST] 10 (Đề 2). He **didn\'t bat an eye** when he realized he failed the exam again.',
    options: ["A. wasn't surprise", "B. didn't show surprise", "C. wasn't happy", "D. didn't care"],
    answer: 'B',
    explanation: 'not bat an eye / eyelid = không hề chớp mắt, không biểu lộ chút ngạc nhiên hay xúc động nào.'
  },
  {
    id: 'd2-ant-1', examId: 'DE2', category: 'VOCABULARY', type: 'mcq',
    prompt: '[OPPOSITE] 1 (Đề 2). Rooftop green space in cities also helps **mitigate** what scientists call the urban heat island effect.',
    options: ['A. intensify', 'B. cause', 'C. prevent', 'D. weaken'],
    answer: 'A',
    explanation: 'mitigate (làm dịu, giảm nhẹ) >< intensify (làm trầm trọng/mạnh thêm).'
  },
  {
    id: 'd2-ant-2', examId: 'DE2', category: 'VOCABULARY', type: 'mcq',
    prompt: "[OPPOSITE] 2 (Đề 2). I'd love to come, but I am **snowed under** at the moment.",
    options: ['A. am busy', 'B. have free time', 'C. have a bad cold', 'D. am on the move'],
    answer: 'B',
    explanation: 'be snowed under (bận ngập đầu) >< have free time (rảnh rỗi).'
  },
  {
    id: 'd3-v-5', examId: 'DE3', category: 'VOCABULARY', type: 'mcq',
    prompt: '5 (Đề 3). She loved tennis and could watch it till the ________ came home.',
    options: ['A. sheep', 'B. everyone', 'C. horses', 'D. cows'],
    answer: 'D',
    explanation: 'Idiom "till the cows come home": suốt một thời gian rất dài không biết chán.'
  },
  {
    id: 'd3-v-6', examId: 'DE3', category: 'VOCABULARY', type: 'mcq',
    prompt: '6 (Đề 3). I had all the information at my ________ before attending the meeting.',
    options: ['A. fingertips', 'B. thumbs', 'C. hands', 'D. fingers'],
    answer: 'A',
    explanation: 'have sth at one\'s fingertips: nắm rõ trong lòng bàn tay, sẵn sàng sử dụng ngay.'
  },
  {
    id: 'd3-v-10', examId: 'DE3', category: 'VOCABULARY', type: 'mcq',
    prompt: '10 (Đề 3). Since he is too old to be a porter, they have decided to put him out to ________.',
    options: ['A. the door', 'B. grounds', 'C. grass', 'D. the kerb'],
    answer: 'C',
    explanation: 'Idiom "put sb out to grass": cho ai nghỉ hưu (vì đã lớn tuổi).'
  },
  {
    id: 'd3-v-11', examId: 'DE3', category: 'VOCABULARY', type: 'mcq',
    prompt: '11 (Đề 3). After a six-year relationship, Martha and Bill have decided to ________.',
    options: ['A. break the bank', 'B. turn the page', 'C. tie the knot', 'D. make the grade'],
    answer: 'C',
    explanation: 'Idiom "tie the knot" = get married (kết hôn).'
  },
  {
    id: 'd3-v-12', examId: 'DE3', category: 'VOCABULARY', type: 'mcq',
    prompt: '12 (Đề 3). He discovered that his home had been ________ by burglars.',
    options: ['A. annihilated', 'B. exterminated', 'C. ransacked', 'D. eliminated'],
    answer: 'C',
    explanation: 'ransack = lục soát, cướp bóc bừa bãi (nhà cửa).'
  },

  // ======================== WORD FORMATION (ĐỀ 1, 2, 3) ========================
  {
    id: 'd1-wf-1', examId: 'DE1', category: 'WORD_FORMATION', type: 'input',
    prompt: '1 (Đề 1). This has been an unusually (COMPLIMENT) ________ remark for you.',
    rootWord: 'COMPLIMENT',
    answer: 'uncomplimentary',
    explanation: 'Sau mạo từ "an" và trạng từ "unusually" cần tính từ: uncomplimentary (mang tính chê bai, thiếu khen ngợi) hoặc complimentary.'
  },
  {
    id: 'd1-wf-2', examId: 'DE1', category: 'WORD_FORMATION', type: 'input',
    prompt: '2 (Đề 1). Ants and bees are described as (INDUSTRY) ________ insects.',
    rootWord: 'INDUSTRY',
    answer: 'industrious',
    explanation: 'industrious (adj) = cần cù, chăm chỉ (phân biệt với industrial thuộc về công nghiệp).'
  },
  {
    id: 'd1-wf-3', examId: 'DE1', category: 'WORD_FORMATION', type: 'input',
    prompt: '3 (Đề 1). The victims of the mistaken bombing are just the latest (CASUAL) ________ of an increasingly bloody war.',
    rootWord: 'CASUAL',
    answer: 'casualties',
    explanation: 'casualties (n, số nhiều) = thương vong, nạn nhân chiến tranh.'
  },
  {
    id: 'd1-wf-4', examId: 'DE1', category: 'WORD_FORMATION', type: 'input',
    prompt: "4 (Đề 1). We'd concentrate and be self-disciplined to have (COGNITION) ________ skill.",
    rootWord: 'COGNITION',
    answer: 'cognitive',
    explanation: 'cognitive skill = kỹ năng nhận thức.'
  },
  {
    id: 'd1-wf-5', examId: 'DE1', category: 'WORD_FORMATION', type: 'input',
    prompt: "5 (Đề 1). He said he had no intention of hurting me, but I'm sure he hit me (PURPOSE) ________.",
    rootWord: 'PURPOSE',
    answer: 'purposefully',
    acceptAlt: ['purposely'],
    explanation: 'purposefully / purposely (adv) = một cách cố ý, có chủ đích.'
  },
  {
    id: 'd1-wf-6', examId: 'DE1', category: 'WORD_FORMATION', type: 'input',
    prompt: "6 (Đề 1). It's very (COURAGE) ________ to find out that your own team members have been lying to you.",
    rootWord: 'COURAGE',
    answer: 'discouraging',
    explanation: 'discouraging (adj) = gây nản lòng, làm mất tinh thần.'
  },
  {
    id: 'd1-wf-7', examId: 'DE1', category: 'WORD_FORMATION', type: 'input',
    prompt: '7 (Đề 1). According to the recent report, this dreadful (DRY) ________ has ruined sixty per cent of the crops in the region.',
    rootWord: 'DRY',
    answer: 'drought',
    explanation: 'drought (n) = nạn hạn hán.'
  },
  {
    id: 'd1-wf-8', examId: 'DE1', category: 'WORD_FORMATION', type: 'input',
    prompt: '8 (Đề 1). Deserts are not (INHABIT) ________ places as many people believe.',
    rootWord: 'INHABIT',
    answer: 'uninhabitable',
    explanation: 'uninhabitable (adj) = không thể sinh sống được (Sa mạc không phải là nơi không thể sống được như nhiều người nghĩ).'
  },
  {
    id: 'd1-wf-9', examId: 'DE1', category: 'WORD_FORMATION', type: 'input',
    prompt: "9 (Đề 1). If we hadn't (ECONOMY) ________ on food and water, we wouldn't have survived a single day in the cave.",
    rootWord: 'ECONOMY',
    answer: 'economized',
    acceptAlt: ['economised'],
    explanation: 'economize / economise (on sth) = tiết kiệm. Câu ĐK loại 3: hadn\'t + P2 (economized).'
  },
  {
    id: 'd1-wf-10', examId: 'DE1', category: 'WORD_FORMATION', type: 'input',
    prompt: "10 (Đề 1). This is (DOUBT) ________ Michael. I'd recognize him even if he wore a beard.",
    rootWord: 'DOUBT',
    answer: 'undoubtedly',
    acceptAlt: ['doubtlessly'],
    explanation: 'undoubtedly (adv) = chắc chắn, không nghi ngờ gì nữa.'
  },
  {
    id: 'd2-wf-1', examId: 'DE2', category: 'WORD_FORMATION', type: 'input',
    prompt: '1 (Đề 2). I try to (VISION) ________ an occasion when I might be 600 feet below sea level.',
    rootWord: 'VISION',
    answer: 'envision',
    acceptAlt: ['visualize', 'visualise'],
    explanation: 'envision / visualize (v) = hình dung, mường tượng.'
  },
  {
    id: 'd2-wf-3', examId: 'DE2', category: 'WORD_FORMATION', type: 'input',
    prompt: '3 (Đề 2). There was a sudden (BURST) ________ of clapping and cheering as he rose to receive the Nobel Peace Prize.',
    rootWord: 'BURST',
    answer: 'outburst',
    explanation: 'outburst (n) = sự bùng nổ (tiếng vỗ tay, cảm xúc).'
  },
  {
    id: 'd2-wf-4', examId: 'DE2', category: 'WORD_FORMATION', type: 'input',
    prompt: '4 (Đề 2). She felt her husband constantly (LITTLE) ________ her achievements.',
    rootWord: 'LITTLE',
    answer: 'belittled',
    explanation: 'belittle (v) = xem thường, hạ thấp thành tựu của ai (chia quá khứ "belittled" theo "felt").'
  },
  {
    id: 'd2-wf-5', examId: 'DE2', category: 'WORD_FORMATION', type: 'input',
    prompt: '5 (Đề 2). Taking that old lady for a ride is (CONSCIENCE) ________.',
    rootWord: 'CONSCIENCE',
    answer: 'unconscionable',
    explanation: 'unconscionable (adj) = vô lương tâm, không thể chấp nhận được ("take sb for a ride" = lừa gạt ai).'
  },
  {
    id: 'd2-wf-8', examId: 'DE2', category: 'WORD_FORMATION', type: 'input',
    prompt: '8 (Đề 2). Pluto is said to be the (OUT) ________ planet of the solar system.',
    rootWord: 'OUT',
    answer: 'outermost',
    explanation: 'outermost (adj) = ngoài cùng, xa nhất.'
  },
  {
    id: 'd2-wf-9', examId: 'DE2', category: 'WORD_FORMATION', type: 'input',
    prompt: '9 (Đề 2). Burning coal is an (ECONOMY) ________ way of heating a house. Gas is much cheaper.',
    rootWord: 'ECONOMY',
    answer: 'uneconomical',
    explanation: 'uneconomical (adj) = tốn kém, không tiết kiệm.'
  },
  {
    id: 'd3-wf-3', examId: 'DE3', category: 'WORD_FORMATION', type: 'input',
    prompt: '3 (Đề 3). Viet Nam went through (COLONY) ________ process and became an independent country.',
    rootWord: 'COLONY',
    answer: 'decolonization',
    acceptAlt: ['decolonisation'],
    explanation: 'decolonization (n) = quá trình phi thực dân hóa / giành độc lập.'
  },
  {
    id: 'd3-wf-9', examId: 'DE3', category: 'WORD_FORMATION', type: 'input',
    prompt: '9 (Đề 3). Rubber bullets are designed to (CAPACITY) ________ people rather than kill them.',
    rootWord: 'CAPACITY',
    answer: 'incapacitate',
    explanation: 'incapacitate (v) = làm mất khả năng hoạt động/chiến đấu tạm thời.'
  },

  // ======================== SENTENCE TRANSFORMATION (ĐỀ 1, 2, 3) ========================
  {
    id: 'd1-st-1', examId: 'DE1', category: 'TRANSFORMATION', type: 'input',
    prompt: "1 (Đề 1). The collision didn't damage his car much.\n→ Not a great ________________________________.",
    rootWord: 'Not a great',
    answer: 'Not a great deal of damage was done to his car by the collision.',
    acceptAlt: [
      'Not a great deal of damage was caused to his car by the collision',
      'Not a great deal of damage was done to his car',
      'deal of damage was done to his car by the collision'
    ],
    explanation: 'Cấu trúc: Not a great deal of damage + was done/caused to sth.'
  },
  {
    id: 'd1-st-2', examId: 'DE1', category: 'TRANSFORMATION', type: 'input',
    prompt: "2 (Đề 1). You didn't think carefully enough before you applied for the job in Manchester.\n→ You ought ________________________________.",
    rootWord: 'You ought',
    answer: 'You ought to have thought more carefully before you applied for the job in Manchester.',
    acceptAlt: [
      'You ought to have thought more carefully before applying for the job in Manchester',
      'to have thought more carefully before you applied for the job in Manchester'
    ],
    explanation: 'ought to have P2: lẽ ra nên làm gì trong quá khứ nhưng đã không làm.'
  },
  {
    id: 'd1-st-5', examId: 'DE1', category: 'TRANSFORMATION', type: 'input',
    prompt: "5 (Đề 1). I'm having a lot of trouble now because I lost my passport last week.\n→ If I ________________________________.",
    rootWord: 'MIXED CONDITIONAL',
    answer: "If I hadn't lost my passport last week, I wouldn't be having so much trouble now.",
    acceptAlt: [
      "If I had not lost my passport last week, I wouldn't be having a lot of trouble now",
      "hadn't lost my passport last week, I wouldn't be having so much trouble now"
    ],
    explanation: 'Câu điều kiện hỗn hợp loại 3-2 (Mixed Conditional): If + S + had P2 (last week), S + would + V_inf / be V-ing (now).'
  },
  {
    id: 'd1-st-6', examId: 'DE1', category: 'TRANSFORMATION', type: 'input',
    prompt: '6 (Đề 1). Soon the whole town had heard the news about the bank robbery. (WILDFIRE)',
    rootWord: 'WILDFIRE',
    answer: 'The news about the bank robbery spread like wildfire through the whole town.',
    acceptAlt: [
      'The news about the bank robbery spread through the whole town like wildfire',
      'spread like wildfire'
    ],
    explanation: 'Idiom "spread like wildfire": (tin tức) lan truyền nhanh như cháy rừng.'
  },
  {
    id: 'd1-st-7', examId: 'DE1', category: 'TRANSFORMATION', type: 'input',
    prompt: "7 (Đề 1). Andrew doesn't claim to have a lot of musical talent. (PRETENCE)",
    rootWord: 'PRETENCE',
    answer: 'Andrew makes no pretence of having a lot of musical talent.',
    acceptAlt: [
      'Andrew makes no pretence to have a lot of musical talent',
      'makes no pretence of having'
    ],
    explanation: 'Cấu trúc "make no pretence of V-ing / to V": không hề giả vờ hay tự nhận là có.'
  },
  {
    id: 'd1-st-8', examId: 'DE1', category: 'TRANSFORMATION', type: 'input',
    prompt: "8 (Đề 1). I don't think they are likely to carry out the plan to upgrade the old sports complex. (PRACTICE)",
    rootWord: 'PRACTICE',
    answer: "I don't think they are likely to put into practice the plan to upgrade the old sports complex.",
    acceptAlt: [
      "I don't think the plan to upgrade the old sports complex is likely to be put into practice",
      'put the plan into practice',
      'put into practice'
    ],
    explanation: 'Collocation "put a plan into practice" = carry out a plan (đưa kế hoạch vào thực tiễn).'
  },
  {
    id: 'd1-st-9', examId: 'DE1', category: 'TRANSFORMATION', type: 'input',
    prompt: "9 (Đề 1). I thought very hard but couldn't remember the answer. (RACKED)",
    rootWord: 'RACKED',
    answer: "I racked my brains to remember the answer, but I couldn't.",
    acceptAlt: [
      "I racked my brains but couldn't remember the answer",
      'I racked my brain',
      'racked my brains'
    ],
    explanation: 'Idiom "rack one\'s brain(s)": vắt óc suy nghĩ.'
  },
  {
    id: 'd1-st-10', examId: 'DE1', category: 'TRANSFORMATION', type: 'input',
    prompt: "10 (Đề 1). Peter doesn't blog as his writing skills are quite lacking. (SCRATCH)",
    rootWord: 'SCRATCH',
    answer: "Peter doesn't blog as his writing skills aren't up to scratch.",
    acceptAlt: [
      "Peter doesn't blog because his writing skills are not up to scratch",
      'not up to scratch',
      "aren't up to scratch"
    ],
    explanation: 'Idiom "be up to scratch": đạt tiêu chuẩn, đủ tốt.'
  },
  {
    id: 'd2-st-1', examId: 'DE2', category: 'TRANSFORMATION', type: 'input',
    prompt: '1 (Đề 2 - Part 4). Mary felt uncomfortable in the huge hotel. (FISH)\n→ Mary ________________________ water in the huge hotel.',
    rootWord: 'FISH',
    answer: 'felt like a fish out of',
    acceptAlt: ['Mary felt like a fish out of water in the huge hotel'],
    explanation: 'Idiom "feel like a fish out of water": cảm thấy lạc lõng, không thoải mái ở môi trường lạ.'
  },
  {
    id: 'd2-st-2', examId: 'DE2', category: 'TRANSFORMATION', type: 'input',
    prompt: '2 (Đề 2 - Part 4). His father is now having an operation. (KNIFE)\n→ His father is ________________________.',
    rootWord: 'KNIFE',
    answer: 'now under the knife',
    acceptAlt: ['under the knife now', 'His father is now under the knife'],
    explanation: 'Idiom "be under the knife": đang lên bàn mổ / phẫu thuật.'
  },
  {
    id: 'd2-st-10', examId: 'DE2', category: 'TRANSFORMATION', type: 'input',
    prompt: '10 (Đề 2 - Part 4). He is different from his brother in almost all respects. (BEAR)\n→ He ________________________ his brother.',
    rootWord: 'BEAR',
    answer: 'bears little resemblance to',
    acceptAlt: ['bears almost no resemblance to', 'does not bear much resemblance to'],
    explanation: 'Collocation "bear little/no resemblance to sb": hầu như không giống ai.'
  },
  {
    id: 'd3-st-6', examId: 'DE3', category: 'TRANSFORMATION', type: 'input',
    prompt: '6 (Đề 3). She is determined to become a doctor. (HEART)\n→ She has ________________________.',
    rootWord: 'HEART',
    answer: 'set her heart on becoming a doctor',
    acceptAlt: ['She has set her heart on becoming a doctor'],
    explanation: 'Idiom "set one\'s heart on V-ing": quyết tâm, khao khát làm gì.'
  },
  {
    id: 'd3-st-7', examId: 'DE3', category: 'TRANSFORMATION', type: 'input',
    prompt: '7 (Đề 3). They may have escaped through the backdoor. (GETAWAY)\n→ They ________________________.',
    rootWord: 'GETAWAY',
    answer: 'may have made their getaway through the backdoor',
    acceptAlt: ['They may have made their getaway through the backdoor'],
    explanation: 'Collocation "make one\'s getaway": tẩu thoát.'
  },
  {
    id: 'd3-st-8', examId: 'DE3', category: 'TRANSFORMATION', type: 'input',
    prompt: '8 (Đề 3). He got revenge on her. (OWN)\n→ He ________________________.',
    rootWord: 'OWN',
    answer: 'got his own back on her',
    acceptAlt: ['He got his own back on her'],
    explanation: 'Idiom "get one\'s own back (on sb)": trả đũa, trả thù ai.'
  }
];

// ============================================================================
// PASSAGE-BASED EXERCISES (CLOZE, READING, GAPPED TEXT, PROOFREADING)
// ============================================================================

const INITIAL_PASSAGES = [
  // 1. ĐỀ 1 - GUIDED CLOZE: How independent are today's young adults?
  {
    id: 'p-d1-cloze1',
    examId: 'DE1',
    category: 'CLOZE',
    subType: 'Guided Cloze (MCQ)',
    title: "Đề 1 - Section A.IV: How independent are today's young adults?",
    content: `In the past, young adults (41) ________ up fast. Eager to (42) ________ out on their own, many supported themselves financially while still at university. Others entered the workforce upon leaving school, saved up the money for a(n) (43) ________ and once they had it moved out of the family home and into their first rental property.

However, the results of a government study indicate that there is less urgency among today's 20 to 24 year-olds to become (44) ________. Admittedly, the global economic downturn and resultant unemployment can in large part (45) ________ for their hesitation to leave the (46) ________.

Another study asked undergraduates if they knew how to budget before (47) ________ the groups of young people living independently at university. (48) ________ 70 per cent said they didn't. Many were (49) ________ about being irresponsible with their student loan. Nearly a third admitted to (50) ________ out too frequently and spending it all within just a few months of receiving it.`,
    questions: [
      { id: 'd1-c-41', type: 'mcq', prompt: 'Blank (41)', options: ['A. brought', 'B. came', 'C. grew', 'D. raised'], answer: 'C', explanation: 'grow up fast = trưởng thành nhanh chóng.' },
      { id: 'd1-c-42', type: 'mcq', prompt: 'Blank (42)', options: ['A. stay', 'B. rule', 'C. stand', 'D. strike'], answer: 'D', explanation: 'Idiom "strike out on one\'s own": bắt đầu tự lập, ra riêng.' },
      { id: 'd1-c-43', type: 'mcq', prompt: 'Blank (43)', options: ['A. agency', 'B. deposit', 'C. landlord', 'D. utility'], answer: 'B', explanation: 'save up for a deposit: tiết kiệm tiền đặt cọc thuê/mua nhà.' },
      { id: 'd1-c-44', type: 'mcq', prompt: 'Blank (44)', options: ['A. autonomous', 'B. liberated', 'C. self-sufficient', 'D. sovereign'], answer: 'C', explanation: 'self-sufficient = tự túc, tự lập về tài chính.' },
      { id: 'd1-c-45', type: 'mcq', prompt: 'Blank (45)', options: ['A. account', 'B. credit', 'C. explain', 'D. excuse'], answer: 'A', explanation: 'account for = giải thích cho, là nguyên nhân của.' },
      { id: 'd1-c-46', type: 'mcq', prompt: 'Blank (46)', options: ['A. living', 'B. home', 'C. nest', 'D. hometown'], answer: 'C', explanation: 'Idiom "leave the nest": rời tổ ấm gia đình.' },
      { id: 'd1-c-47', type: 'mcq', prompt: 'Blank (47)', options: ['A. considering', 'B. taking', 'C. helping', 'D. joining'], answer: 'D', explanation: 'join the groups of...: gia nhập nhóm sinh viên sống tự lập.' },
      { id: 'd1-c-48', type: 'mcq', prompt: 'Blank (48)', options: ['A. Almost', 'B. All most', 'C. Most', 'D. Mostly'], answer: 'A', explanation: 'Almost + con số phần trăm (Almost 70 per cent = Gần 70%).' },
      { id: 'd1-c-49', type: 'mcq', prompt: 'Blank (49)', options: ['A. candid', 'B. sincere', 'C. genuine', 'D. natural'], answer: 'A', explanation: 'be candid about sth = thẳng thắn thừa nhận.' },
      { id: 'd1-c-50', examId: 'DE1', type: 'mcq', prompt: 'Blank (50)', options: ['A. gushing', 'B. splashing', 'C. giving', 'D. handing'], answer: 'B', explanation: 'splash out = tiêu tiền hoang phí, vung tay quá trán.' }
    ]
  },

  // 2. ĐỀ 1 - OPEN CLOZE: Effective Learning
  {
    id: 'p-d1-opencloze',
    examId: 'DE1',
    category: 'CLOZE',
    subType: 'Open Cloze (Fill 1 Word)',
    title: 'Đề 1 - Section B.I Part 1: EFFECTIVE LEARNING (Open Cloze)',
    content: `At one time, many experts believed that students would become more effective learners (1) ________ they were made aware of learning styles that suited them. (2) ________ the 1980s onwards, theorists identified a number of learning styles, some of (3) ________ were visual, verbal, auditory and kinaesthetic learning. A kinaesthetic learner, for example, would benefit from using their body and sense of touch when learning. Over time, (4) ________, these concepts have fallen out of favor. "They're no longer up to date," says educational psychologist Dr Lorna Mulhall. Taking a flexible approach (5) ________ than sticking to one particular learning style makes better sense. In my experience, (6) ________ an active learner is usually the key to success. Research shows that one of the best ways to learn (7) ________ is to imagine teaching it. "Think about (8) ________ you will explain it to someone in a classroom," says Dr Mulhall. "To teach something, you need to understand it." Dr. Mulhall (9) ________ recommends some basic principles. These include "finding the right environment, efficient note-taking, and taking breaks. (10) ________ comes a point where you can't absorb any more information and need to do something different."`,
    questions: [
      { id: 'd1-oc-1', type: 'input', prompt: 'Blank (1)', answer: 'if', acceptAlt: ['when', 'once'], explanation: 'Câu điều kiện: if / when they were made aware of...' },
      { id: 'd1-oc-2', type: 'input', prompt: 'Blank (2)', answer: 'From', explanation: 'Cụm "From the 1980s onwards" (Từ những năm 1980 trở đi).' },
      { id: 'd1-oc-3', type: 'input', prompt: 'Blank (3)', answer: 'which', explanation: 'Mệnh đề quan hệ: some of which (một vài trong số các phong cách học đó).' },
      { id: 'd1-oc-4', type: 'input', prompt: 'Blank (4)', answer: 'however', acceptAlt: ['though'], explanation: 'Over time, however, these concepts have fallen out of favor.' },
      { id: 'd1-oc-5', type: 'input', prompt: 'Blank (5)', answer: 'rather', explanation: 'rather than = thay vì.' },
      { id: 'd1-oc-6', type: 'input', prompt: 'Blank (6)', answer: 'being', acceptAlt: ['becoming'], explanation: 'Danh động từ làm chủ ngữ: being an active learner.' },
      { id: 'd1-oc-7', type: 'input', prompt: 'Blank (7)', answer: 'something', explanation: 'learn something (khớp với "teaching it" ở phía sau).' },
      { id: 'd1-oc-8', type: 'input', prompt: 'Blank (8)', answer: 'how', explanation: 'Think about how you will explain it...' },
      { id: 'd1-oc-9', type: 'input', prompt: 'Blank (9)', answer: 'also', explanation: 'Dr. Mulhall also recommends... (bổ sung thêm lời khuyên).' },
      { id: 'd1-oc-10', type: 'input', prompt: 'Blank (10)', answer: 'There', explanation: 'Cấu trúc "There comes a point where..." (Sẽ đến một thời điểm mà...).' }
    ]
  },

  // 3. ĐỀ 1 - READING COMPREHENSION: Fake art meets real money
  {
    id: 'p-d1-read1',
    examId: 'DE1',
    category: 'READING',
    subType: 'Multiple Choice Reading',
    title: 'Đề 1 - Section A.V: Fake art meets real money (Christophe Petyt)',
    content: `Christophe Petyt has turned the production of exact copies of masterpieces by the world's most famous painters into big business.

Christophe Petyt is sitting in a Paris café, listing the adornments of his private art collection: several Van Goghs, and a comprehensive selection of the better Impressionists. 'I can,' he says quietly, 'really get to know any painting I like, and so can you.' Half an hour later I am sitting in his office with Degas' The Jockeys on my lap. If fine art looks good in a gallery, believe me, it feels even better in your hands. Petyt is the world's leading dealer in fake masterpieces, a man whose activities provoke both admiration and exasperation in the higher levels of the art world. Name the painting and for as little as £1,000 he will deliver you a copy so well executed that even the original artist might have been taken in.

Petyt's company employs over eighty painters, each steeped in the style of a particular artist or school. 'We choose them very carefully,' he says. 'They're usually people with very good technique but not much creativity, who are unlikely to make it as artists in their own right. But they love the great works and have real insight into what's gone into them.' Every work is individually commissioned, using new canvases and traditional oil paints, before being artificially aged by a variety of simple but ingenious techniques.

The notional value of the original is not the determining factor, however, when it comes to setting the retail value of Petyt's paintings. This is actually linked to the amount of effort and expertise that has gone into producing the copy. An obscure miniature may therefore cost much more than a bigger, better-known painting by a grand master. The Degas I'm holding looks as though it came off the artist's easel yesterday. Before being sold it has to be aged, and this, so to speak, is the real 'art' of the copy. A few minutes in a hot oven can put years on a canvas, black tea apparently stains it beautifully and new frames can be buried underground, then sprayed with acid.

The view when Petyt started out was that very little of this could be legal. He was pursued through the French courts by museums and by descendants of the artists, with several major French art dealers cheering from the sidelines. This concern was perhaps understandable in a country that has been rocked by numerous art fraud scandals. 'The establishment was suspicious of us,' huffs Petyt, 'but for the wrong reasons, I think. Some people want to keep all the best art for themselves.' He won the case and as the law now stands, the works and signatures of any artist who has been dead for seventy years can be freely copied. The main proviso is that the copy cannot be passed off to dealers as the real thing. To prevent this, every new painting is indelibly marked on the back of the canvas, and as an additional precaution a tiny hidden piece of gold leaf is worked into the paint.

Until he started the business ten years ago, Petyt, a former business-school student, barely knew one artist from another. Then one particular painting by Van Gogh caught his eye. At $10 million, it was well beyond his reach so he came up with the idea of getting an art-student friend to paint him a copy. In an old frame it looked absolutely wonderful, and Petyt began to wonder what market there might be for it. He picked up a coffee-table book of well-known paintings, earmarked a random selection of works and got his friend to knock them off. 'Within a few months I had about twenty good copies,' he says, 'so I organised an exhibition. In two weeks we'd sold the lot, and got commissions for sixty more.' It became clear that a huge and lucrative market existed for faux art.

Petyt's paintings are exhibited away from the traditional art centres - in places with lavish houses in need of equally impressive works of art. Although their owners include rock stars, fashion designers and top businesspeople, they either cannot afford or more likely simply cannot obtain great works of art. Petyt is understandably reluctant to name any of his clients, but says that sometimes even the owner of the original will occasionally commission a copy. 'The best paintings are so valuable,' he explains, 'that it's risky to have them at home and the costs of security and insurance are huge. So some collectors keep the original in a bank vault and hang our copy.'`,
    questions: [
      {
        id: 'd1-r1-51', type: 'mcq',
        prompt: '51. In the first paragraph, the writer indicates that he shares ________',
        options: [
          "A. Petyt's enjoyment of the work of a range of painters.",
          "B. the art world's suspicious attitude towards Petyt's activities.",
          'C. the general inability to distinguish copies from real paintings.',
          "D. Petyt's desire to appreciate great works of art at close quarters."
        ],
        answer: 'D',
        explanation: 'Dẫn chứng: "If fine art looks good in a gallery, believe me, it feels even better in your hands."'
      },
      {
        id: 'd1-r1-52', type: 'mcq',
        prompt: '52. What do we learn about the painters employed by Petyt?',
        options: [
          'A. They have been specially trained in the techniques of forgery.',
          'B. They were chosen because of the quality of their original work.',
          'C. They have to be versatile in terms of the range of styles they reproduce.',
          'D. They make copies of those paintings which customers specifically request.'
        ],
        answer: 'D',
        explanation: 'Dẫn chứng đoạn 2: "Every work is individually commissioned..." (Mỗi bức tranh đều được đặt hàng riêng theo yêu cầu).'
      },
      {
        id: 'd1-r1-53', type: 'mcq',
        prompt: "53. The price of one of Petyt's paintings tends to depend on ________",
        options: [
          'A. the status of the original artist.',
          'B. the time and skill needed to create it.',
          'C. the degree to which it has to be artificially aged.',
          'D. the extent to which the copy truly replicates the original.'
        ],
        answer: 'B',
        explanation: 'Dẫn chứng đoạn 3: "This is actually linked to the amount of effort and expertise that has gone into producing the copy."'
      },
      {
        id: 'd1-r1-54', type: 'mcq',
        prompt: '54. How does Petyt feel about the attempts to prove that his activities were illegal?',
        options: [
          'A. He suspects that they were not driven by public-spirited motives.',
          'B. He accepts that they were useful in helping to establish his integrity.',
          'C. He regrets that they gained the support of other art dealers in France.',
          "D. He respects the right of the real artists' families to protect their interests."
        ],
        answer: 'A',
        explanation: 'Dẫn chứng đoạn 4: "but for the wrong reasons, I think. Some people want to keep all the best art for themselves."'
      },
      {
        id: 'd1-r1-55', type: 'mcq',
        prompt: '55. As a result of the court case he won, Petyt ________',
        options: [
          'A. no longer reproduces fake signatures on paintings he sells.',
          'B. has been able to copy the work of more contemporary artists.',
          'C. is obliged to make sure his products can be identified as copies.',
          'D. has agreed not to market his products through certain channels.'
        ],
        answer: 'C',
        explanation: 'Dẫn chứng đoạn 4: "The main proviso is that the copy cannot be passed off to dealers as the real thing. To prevent this, every new painting is indelibly marked..."'
      },
      {
        id: 'd1-r1-56', type: 'mcq',
        prompt: '56. What do we learn about the way Petyt selected the paintings that would appear in his exhibition?',
        options: [
          'A. They needed to be ones that could be reproduced quickly.',
          'B. It was not something that he put a great deal of thought into.',
          'C. They had to be pictures that would appeal to the buying public.',
          "D. He did some research into the work of artists he'd always admired."
        ],
        answer: 'B',
        explanation: 'Dẫn chứng đoạn 5: "He picked up a coffee-table book of well-known paintings, earmarked a random selection of works..."'
      },
      {
        id: 'd1-r1-57', type: 'mcq',
        prompt: "57. What is implied about the majority of Petyt's customers?",
        options: [
          'A. They have little genuine interest in contemporary art.',
          'B. They regard works of art as a lifestyle accessory.',
          'C. They may buy the paintings purely as a form of financial investment.',
          'D. They are wealthy enough to buy the original works of art if they wanted.'
        ],
        answer: 'B',
        explanation: 'Dẫn chứng đoạn 6: "in places with lavish houses in need of equally impressive works of art."'
      },
      {
        id: 'd1-r1-58', type: 'mcq',
        prompt: '58. Why did Petyt decide to start producing copies of famous paintings?',
        options: [
          'A. Because he wanted to expose weaknesses in art authentication.',
          'B. Because buying original works was far beyond his financial reach.',
          'C. Because he was encouraged by famous dealers in Paris.',
          'D. Because he believed copies were superior to original works.'
        ],
        answer: 'B',
        explanation: 'Dẫn chứng đoạn 5: "At $10 million, it was well beyond his reach so he came up with the idea..."'
      },
      {
        id: 'd1-r1-59', type: 'mcq',
        prompt: '59. What precaution does Petyt take to ensure his copies cannot be mistaken for originals?',
        options: [
          'A. He attaches a certificate of authenticity to every painting.',
          'B. He ensures the copies are always slightly smaller than the originals.',
          'C. He marks them on the back of the canvas and includes a hidden feature.',
          'D. He uses less expensive materials than those used in the original works.'
        ],
        answer: 'C',
        explanation: 'Dẫn chứng đoạn 4: "indelibly marked on the back of the canvas, and... a tiny hidden piece of gold leaf is worked into the paint."'
      },
      {
        id: 'd1-r1-60', type: 'mcq',
        prompt: "60. What is suggested about some of Petyt's wealthy clients?",
        options: [
          'A. They keep the originals safe while displaying the copies.',
          'B. They sell the copies as if they were real paintings.',
          'C. They prefer contemporary works over old masterpieces.',
          'D. They ask Petyt to train them in painting techniques.'
        ],
        answer: 'A',
        explanation: 'Dẫn chứng đoạn 6: "some collectors keep the original in a bank vault and hang our copy."'
      }
    ]
  },

  // 4. ĐỀ 1 - GAPPED TEXT: When the hippos roar, start paddling!
  {
    id: 'p-d1-hippos',
    examId: 'DE1',
    category: 'READING',
    subType: 'Gapped Text (A-H)',
    title: 'Đề 1 - Section B.I Part 2: When the hippos roar, start paddling! (Gapped Text)',
    content: `"They say this is a good test of a relationship," said Tim as he handed me the paddle. My wife, Leigh, and I were standing with our guide, Tim Came, on the banks of the Zambezi near the Zambia/Botswana border. This was to be the highlight of our honeymoon: a safari downriver, ending at the point where David Livingstone first saw the Victoria Falls.

[GAP 11]
Neither of us had any canoeing experience. Tentatively we set off downstream, paddling with more enthusiasm than expertise. Soon we heard the first distant rumblings of what seemed like thunder. 'Is that Victoria Falls?' we inquired naïvely. 'No,' said Tim dismissively. 'That's our first rapid.' Easy, we thought. Wrong!

[GAP 12]
The canoe plotted a crazed path as we careered from side to side, our best efforts seeming only to add to our plight. This was the first of many rapids, all relatively minor, all enjoyably challenging for tourists like us.

[GAP 13]
The overnight stops would mean mooring at a deserted island in the middle of the river, where Tim's willing support team would be waiting, having erected a camp and got the water warm for our bucket showers... Then people would begin to relax, and the day's stories would take on epic proportions.

[GAP 14]
One morning, Tim decided to count the number of hippos we saw... They'd normally stay in mid-stream, watching us with some suspicion, and greeting our departure with a cacophony of grunts.

[GAP 15]
Tim yelled 'Paddle!' and over the next 100 metres an Olympic runner would have struggled to keep up with us. The hippo gave up the chase...

[GAP 16]
We were still trembling from the encounter when Tim pointed towards the riverbank. A family of elephants had come down to drink...

[GAP 17]
At last, after days of paddling, we heard the unmistakable thunder of Victoria Falls.

---------------------------------------------------
MISSING PARAGRAPHS (A - H):
A. Luckily we could make our mistakes in privacy as, apart from Tim and another couple, for two days we were alone. Our only other company was the array of bird and animal life. The paddling was fairly gentle, and when we got tired, Tim would lead us to the shore and open a cool-box containing a picnic lunch.
B. There was plenty of passing traffic to observe on land as well - giraffes, hippos, elephants and warthogs, while eagles soared overhead. We even spotted two rare white rhinos. We paddled closer to get a better look.
C. We had a four-metre aluminium canoe to ourselves. It was a small craft for such a mighty river, but quite big enough to house the odd domestic dispute. Couples had, it seemed, ended similar trips arguing rather than paddling...
D. But number 150 had other ideas. As we hugged the bank he dropped under the water. We expected him to re-surface in the same spot, as the others had done. Instead, there was a sudden roar and he emerged lunging towards the canoe.
E. Over the next hour or so the noise grew to terrifying dimensions. By the time we edged around the bend to confront it, we were convinced we would be faced with mountains of white water. Instead, despite all the sound and fury, the Zambezi seemed only slightly ruffled by a line of small rocks.
F. When we'd all heard enough, we slept under canvas, right next to the river bank. Fortunately, we picked a time of year largely free of mosquitoes...
G. However, the closer we moved, the more obvious it became that we were intruding. The rhinos shifted uneasily and Tim quickly signaled us to pull back...
H. The sudden attack left us frozen for a moment, hearts racing. Yet Tim stayed calm, shouting orders with sharp confidence. His experience turned our panic into action, and somehow our frantic paddling began to work in unison...`,
    questions: [
      { id: 'd1-gap-11', type: 'mcq', prompt: 'Gap 11', options: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'], answer: 'C', explanation: 'Liên kết "test of a relationship" ở đoạn mở đầu với "domestic dispute / Couples had ended similar trips arguing" ở đoạn C.' },
      { id: 'd1-gap-12', type: 'mcq', prompt: 'Gap 12', options: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'], answer: 'E', explanation: 'Liên kết tiếng ồn của thác ghềnh đầu tiên ("first distant rumblings... That\'s our first rapid") với "Over the next hour or so the noise grew to terrifying dimensions" ở đoạn E.' },
      { id: 'd1-gap-13', type: 'mcq', prompt: 'Gap 13', options: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'], answer: 'A', explanation: 'Đoạn A nói về việc mắc lỗi khi chèo thuyền ban ngày và dừng ăn trưa picnic, trước khi chuyển sang "The overnight stops" ở đoạn sau.' },
      { id: 'd1-gap-14', type: 'mcq', prompt: 'Gap 14', options: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'], answer: 'F', explanation: 'Liên kết "the day\'s stories would take on epic proportions" với "When we\'d all heard enough, we slept under canvas..." ở đoạn F.' },
      { id: 'd1-gap-15', type: 'mcq', prompt: 'Gap 15', options: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'], answer: 'D', explanation: 'Liên kết việc đếm hà mã ("count the number of hippos") với "But number 150 had other ideas... emerged lunging towards the canoe" ở đoạn D.' },
      { id: 'd1-gap-16', type: 'mcq', prompt: 'Gap 16', options: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'], answer: 'H', explanation: 'Sau khi hà mã rượt đuổi (đoạn 15), đoạn H mô tả cảm xúc "The sudden attack left us frozen..." và kết nối với "We were still trembling from the encounter".' },
      { id: 'd1-gap-17', type: 'mcq', prompt: 'Gap 17', options: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'], answer: 'B', explanation: 'Đoạn B/G mô tả cảnh vật động vật hoang dã trên đường tiến về đích Victoria Falls.' }
    ]
  },

  // 5. ĐỀ 1 - IELTS READING: Changing our Understanding of Health
  {
    id: 'p-d1-health',
    examId: 'DE1',
    category: 'READING',
    subType: 'IELTS Headings + YES/NO/NG',
    title: 'Đề 1 - Section B.I Part 3: Changing our Understanding of Health',
    content: `List of Headings:
i. Ottawa International Conference on Health Promotion
ii. Holistic approach to health
iii. The primary importance of environmental factors
iv. Healthy lifestyles approach to health
v. Changes in concepts of health in Western society
vi. Prevention of diseases and illness
vii. Ottawa Charter for Health Promotion
viii. Definition of health in medical terms
ix. Socio-ecological view of health

Paragraph A (Example -> v): The concept of health holds different meanings for different people and groups. These meanings of health have also changed over time...

Paragraph B: For much of recent Western history, health has been viewed in the physical sense only. That is, good health has been connected to the smooth mechanical operation of the body, while ill health has been attributed to a breakdown in this machine. Health in this sense has been defined as the absence of disease or illness and is seen in medical terms...

Paragraph C: In the late 1940s the World Health Organisation challenged this physically and medically oriented view of health. They stated that 'health is a complete state of physical, mental and social well-being and is not merely the absence of disease' (WHO, 1946). Health and the person were seen more holistically (mind/body/spirit) and not just in physical terms.

Paragraph D: The 1970s was a time of focusing on the prevention of disease and illness by emphasising the importance of the lifestyle and behaviour of the individual. Specific behaviours which were seen to increase risk of disease, such as smoking, lack of fitness and unhealthy eating habits, were targeted... While this individualistic healthy lifestyles approach to health worked for some (the wealthy members of society), people experiencing poverty, unemployment... benefited little from this approach.

Paragraph E: During 1980s and 1990s there has been a growing swing away from seeing lifestyle risks as the root cause of poor health. While lifestyle factors still remain important, health is being viewed also in terms of the social, economic and environmental contexts in which people live. This broad approach to health is called the socio-ecological view of health...

Paragraph F: At the Ottawa Conference in 1986, a charter was developed which outlined new directions for health promotion based on the socio-ecological view of health. This charter, known as the Ottawa Charter for Health Promotion, remains as the backbone of health action today...`,
    questions: [
      { id: 'd1-h-18', type: 'input', prompt: '18. Heading for Paragraph B (nhập số La Mã i - ix)', answer: 'viii', explanation: 'Paragraph B: "Health in this sense has been defined as the absence of disease or illness and is seen in medical terms" -> viii. Definition of health in medical terms.' },
      { id: 'd1-h-19', type: 'input', prompt: '19. Heading for Paragraph C (nhập số La Mã i - ix)', answer: 'ii', explanation: 'Paragraph C: "Health and the person were seen more holistically (mind/body/spirit)" -> ii. Holistic approach to health.' },
      { id: 'd1-h-20', type: 'input', prompt: '20. Heading for Paragraph D (nhập số La Mã i - ix)', answer: 'iv', explanation: 'Paragraph D nói về "healthy lifestyles approach to health" những năm 1970 -> iv.' },
      { id: 'd1-h-21', type: 'input', prompt: '21. Heading for Paragraph E (nhập số La Mã i - ix)', answer: 'ix', explanation: 'Paragraph E: "This broad approach to health is called the socio-ecological view of health" -> ix.' },
      { id: 'd1-h-22', type: 'input', prompt: '22. Heading for Paragraph F (nhập số La Mã i - ix)', answer: 'vii', explanation: 'Paragraph F giới thiệu "Ottawa Charter for Health Promotion" -> vii.' },
      { id: 'd1-h-23', type: 'input', prompt: '23. In which year did the WHO define health in terms of mental, physical and social well-being?', answer: '1946', acceptAlt: ['in 1946', 'late 1940s'], explanation: 'Đoạn C: "(WHO, 1946)".' },
      { id: 'd1-h-24', type: 'input', prompt: '24. Which members of society benefited most from the healthy lifestyles approach?', answer: 'the wealthy members', acceptAlt: ['wealthy members', 'the wealthy'], explanation: 'Đoạn D: "(the wealthy members of society)".' },
      { id: 'd1-h-27', type: 'mcq', prompt: '27. Doctors have been instrumental in improving living standards in Western society.', options: ['YES', 'NO', 'NOT GIVEN'], answer: 'NOT GIVEN', explanation: 'Bài đọc chỉ nhắc đến clean water, sanitation, housing chứ không nói bác sĩ đóng vai trò chính cải thiện mức sống.' },
      { id: 'd1-h-28', type: 'mcq', prompt: '28. The approach to health during the 1970s included the introduction of health awareness programs.', options: ['YES', 'NO', 'NOT GIVEN'], answer: 'YES', explanation: 'Đoạn D: "providing not only medical health care, but health promotion programs and policies".' },
      { id: 'd1-h-29', type: 'mcq', prompt: '29. The socio-ecological view of health recognises that lifestyle habits and the provision of adequate health care are critical factors governing health.', options: ['YES', 'NO', 'NOT GIVEN'], answer: 'NO', explanation: 'Đoạn E nói rằng điều kiện cơ bản cho sức khỏe là peace, shelter, education, food, income... và việc tạo ra sức khỏe vượt xa hơn nhiều so với chỉ khuyến khích lối sống cá nhân và y tế.' },
      { id: 'd1-h-30', type: 'mcq', prompt: '30. In recent years a number of additional countries have subscribed to the Ottawa Charter.', options: ['YES', 'NO', 'NOT GIVEN'], answer: 'NOT GIVEN', explanation: 'Không có thông tin về việc các quốc gia mới ký kết thêm trong những năm gần đây.' }
    ]
  },

  // 6. ĐỀ 2 - PROOFREADING (ERROR IDENTIFICATION): Keeping Your Distance
  {
    id: 'p-d2-error',
    examId: 'DE2',
    category: 'ERROR_ID',
    subType: 'Extra Word Proofreading',
    title: 'Đề 2 - Section C Part 3: KEEPING YOUR DISTANCE (Identify Extra Words)',
    content: `In the following passage, some numbered lines contain a word that shouldn't be there. Write the extra word, or write CORRECT if the line has no extra word.

Line 0: Personal space is a term that refers to the distance we like to keep between (CORRECT)
Line 00: ourselves and other people. When someone we do not know well gets too close (someone -> CORRECT / example)
-----------------------------------------------------------------------------------
Line 1: that we usually begin to feel uncomfortable. If such a business colleague comes
Line 2: closer than 1.2 meters, the most common response is to move away. Some
Line 3: interesting studies have been done in libraries. If strangers will come too close,
Line 4: many people get up and leave the building, others use to different methods such as
Line 5: turning their back on the intruder. Living in cities has made people to develop new
Line 6: skills for dealing with situations where they are very close to strangers. Most
Line 7: people on so crowded trains try not to look at strangers; they avoid skin contact,
Line 8: and apologize if hands touch by a mistake. People use newspapers as a barrier
Line 9: between themselves and other people, and if they do not have one, they stare into
Line 10: the distance, making sure they are not looking into anyone's eyes.`,
    questions: [
      { id: 'd2-err-1', type: 'input', prompt: 'Line 1: "...that we usually begin to feel uncomfortable. If such a business colleague comes"', answer: 'such', acceptAlt: ['that'], explanation: 'Thừa từ "such" (hoặc "that" đầu câu): "a business colleague" không dùng "such a" ở đây.' },
      { id: 'd2-err-2', type: 'input', prompt: 'Line 2: "closer than 1.2 meters, the most common response is to move away. Some"', answer: 'CORRECT', acceptAlt: ['✓', 'tick', 'correct'], explanation: 'Dòng 2 hoàn toàn đúng ngữ pháp.' },
      { id: 'd2-err-3', type: 'input', prompt: 'Line 3: "interesting studies have been done in libraries. If strangers will come too close,"', answer: 'will', explanation: 'Trong mệnh đề điều kiện "If strangers come too close" không dùng "will".' },
      { id: 'd2-err-4', type: 'input', prompt: 'Line 4: "many people get up and leave the building, others use to different methods such as"', answer: 'to', explanation: 'Sau ngoại động từ "use" + tân ngữ "different methods", thừa giới từ "to".' },
      { id: 'd2-err-5', type: 'input', prompt: 'Line 5: "turning their back on the intruder. Living in cities has made people to develop new"', answer: 'to', explanation: 'Cấu trúc sai khiến chủ động: make + sb + V_inf (made people develop), thừa "to".' },
      { id: 'd2-err-6', type: 'input', prompt: 'Line 6: "skills for dealing with situations where they are very close to strangers. Most"', answer: 'CORRECT', acceptAlt: ['✓', 'correct'], explanation: 'Dòng 6 hoàn toàn chính xác.' },
      { id: 'd2-err-7', type: 'input', prompt: 'Line 7: "people on so crowded trains try not to look at strangers; they avoid skin contact,"', answer: 'so', explanation: 'Trước danh từ "crowded trains" không dùng "so" như vậy -> thừa "so".' },
      { id: 'd2-err-8', type: 'input', prompt: 'Line 8: "and apologize if hands touch by a mistake. People use newspapers as a barrier"', answer: 'a', explanation: 'Cụm cố định "by mistake" (vô tình), thừa mạo từ "a".' },
      { id: 'd2-err-9', type: 'input', prompt: 'Line 9: "between themselves and other people, and if they do not have one, they stare into"', answer: 'CORRECT', acceptAlt: ['✓', 'correct'], explanation: 'Dòng 9 hoàn toàn chính xác.' },
      { id: 'd2-err-10', type: 'input', prompt: 'Line 10: "the distance, making sure they are not looking into anyone\'s eyes."', answer: 'CORRECT', acceptAlt: ['✓', 'correct'], explanation: 'Dòng 10 hoàn toàn chính xác.' }
    ]
  },

  // 7. ĐỀ 2 - READING: American Railroads
  {
    id: 'p-d2-railroads',
    examId: 'DE2',
    category: 'READING',
    subType: 'TOEFL Reading Comprehension',
    title: 'Đề 2 - Section C Part 1: AMERICAN RAILROADS',
    content: `Of all the developments in the 19th century, railroads probably had the largest impact on the American economy. The feasibility of steam locomotion was demonstrated by John Stevens. Stevens and his sons created a circular railway on which a train could run at 12 miles an hour. Directors in other major cities were stimulated by the news of the train. Peter Cooper designed a small train, Tom Thumb, and placed it on trial in 1830. Supposedly, this was the first American-built train on the rails.

At first, when they were gradually gaining popularity, American trains followed British designs. Eighty percent of rails in America came from Britain, which also supplied most countries with engineers or iron rails at some point. For example, some places in Asia are "Western built" because they were built under pressure to conform to Western interests. Soon after, minds were focused on developing and improving the locomotive in a noticeably American style.

When the Depression took place in America, many people drank disease-infested water and became sick. Around the same time, wages of railroad workers were cut. Due to the stress and dangers of railroad work, many injuries resulted, and people lost their hands, feet and fingers. Over two hundred workers were being killed each year. Greedy corporations were exploiting employees by reducing wages and labor, then requiring workers to work double shifts. Eventually, people took a stand against selfish corporations, and violent strikes were held in major cities. They demanded a cancellation of the wage cuts. The conflict continued until the workers were finally given 97.5% of their demands.

The building of railroads required an enormous amount of capital; the government refused to finance railroads directly. However, the government helped to finance the building of lines by granting of large tracts of land. The government recovered its investment because land near railroads demanded a much higher price than land without access to transportation...

Railroads encouraged different kinds of economic activity. They influenced real estate values, spurred regional concentration of industry, increased the size of business units, and stimulated the growth of investment banking. Railroads also revolutionized management and business organization, and they considerably reduced freight rates and passenger fares.

Railroads were built in America to open the American West for settlement and farming. It revolutionized Western farming; the center of wheat production moved westward. Farmers were given access to world markets. In countries such as Britain and Russia, for example, railroads were built to transport materials and carry passengers. The latter settled empty territories and developed the agricultural potential of the land.

Railroads also changed cities. Chicago became the railroad center of the Midwest... In 1848, a canal opened up, and the very first railroad reached the city in the same year. The population at the time was 109,260... By 1910, the population had exceeded 2,185,283.`,
    questions: [
      { id: 'd2-rr-1', type: 'mcq', prompt: '1. In paragraph 2, what evidence indicates that Britain was a major force behind international railway production?', options: ['A. Other countries agreed with continuing subordination to Britain.', 'B. A large number of British made rails exported to other countries.', 'C. America opened an agreement with Britain to build its trains.', 'D. The first train was designed and run in Britain.'], answer: 'B', explanation: 'Đoạn 2: "Eighty percent of rails in America came from Britain, which also supplied most countries with engineers or iron rails".' },
      { id: 'd2-rr-2', type: 'mcq', prompt: '2. The word "infested" in the passage is closest in meaning to ________', options: ['A. uncontrolled', 'B. overrun', 'C. restricted', 'D. freed'], answer: 'B', explanation: 'disease-infested = overrun with disease (tràn ngập mầm bệnh).' },
      { id: 'd2-rr-3', type: 'mcq', prompt: '3. According to paragraph 3, what would characterize the average life of a railway worker in America?', options: ['A. great sadness from drinking dirty water on a daily basis.', 'B. payment on time that would provide for their family.', 'C. regular strike action to increase the workforce on the job.', 'D. regular injuries and constant worry over wages or death.'], answer: 'D', explanation: 'Đoạn 3 mô tả cắt giảm lương, tai nạn mất tay chân và hơn 200 công nhân thiệt mạng mỗi năm.' },
      { id: 'd2-rr-4', type: 'mcq', prompt: '4. The word "tracts" in the passage is closest in meaning to ________', options: ['A. taxes', 'B. workers', 'C. machines', 'D. areas'], answer: 'D', explanation: 'large tracts of land = những vùng/dải đất rộng lớn (areas).' },
      { id: 'd2-rr-5', type: 'mcq', prompt: '5. The word "they" in paragraph 5 refers to ________', options: ['A. real estate values', 'B. passenger fares', 'C. business units', 'D. railroads'], answer: 'D', explanation: '"Railroads also revolutionized management..., and they considerably reduced freight rates".' },
      { id: 'd2-rr-8', type: 'mcq', prompt: '8. All of the following are true for railroads EXCEPT?', options: ['A. Railroads made no contribution to revolutionizing Western farming.', 'B. Railroads made changes to cities.', 'C. Different economic activities were stimulated by railroads.', 'D. Railroads helped accelerate the transport of information, products and intelligence.'], answer: 'A', explanation: 'Đoạn 6 nói rõ: "It revolutionized Western farming", nên câu A sai.' },
      { id: 'd2-rr-10', type: 'mcq', prompt: '10. The passage mainly discusses ________', options: ['A. the effects of railroads', 'B. opportunities for settlement in West', 'C. increased speed of moving information', 'D. destroyed lives of the Native Americans'], answer: 'A', explanation: 'Toàn bài phân tích tác động toàn diện của đường sắt đối với kinh tế, nông nghiệp và đô thị Mỹ.' }
    ]
  },

  // 8. ĐỀ 3 - GUIDED CLOZE: The Mysterious Isle
  {
    id: 'p-d3-isle',
    examId: 'DE3',
    category: 'CLOZE',
    subType: 'Guided Cloze (MCQ)',
    title: 'Đề 3 - Section A.IV: The Mysterious Isle',
    content: `In the early morning of 23 January, 2009, the most powerful storm for a decade hit western France. With wind speeds in (1) ________ of 120 miles per hour, it flattened forests, (2) ________ down power lines and caused massive destruction to buildings and roads. But it also left behind an extraordinary creation. Seven miles out to sea at the (3) ________ where the Atlantic Ocean meets the estuary of the River Gironde, a small island had (4) ________ out of water. Locals soon gave it the name The Mysterious Isle. What was so remarkable, (5) ________ its sudden apparition, was the fact that the island (6) ________ intact in what is often quite a hostile sea environment. It could well become a permanent feature.

Scientists (7) ________ realized that the island's appearance (8) ________ a unique opportunity to study the creation and development of a new ecosystem. Within months, it had been colonized by seabirds, insects and vegetation. Unfortunately, however, they were not alone in (9) ________ the island attractive. It became increasingly difficult to (10) ________ the site from human visitors.`,
    questions: [
      { id: 'd3-cl-1', type: 'mcq', prompt: 'Blank (1)', options: ['A. surplus', 'B. advance', 'C. excess', 'D. put'], answer: 'C', explanation: 'in excess of = vượt quá, hơn (120 dặm/giờ).' },
      { id: 'd3-cl-2', type: 'mcq', prompt: 'Blank (2)', options: ['A. fetched', 'B. brought', 'C. carried', 'D. sent'], answer: 'B', explanation: 'bring down power lines = quật đổ đường dây điện.' },
      { id: 'd3-cl-3', type: 'mcq', prompt: 'Blank (3)', options: ['A. scene', 'B. mark', 'C. stage', 'D. point'], answer: 'D', explanation: 'at the point where... = tại điểm/nơi mà...' },
      { id: 'd3-cl-4', type: 'mcq', prompt: 'Blank (4)', options: ['A. risen', 'B. growth', 'C. lifted', 'D. surfaced'], answer: 'A', explanation: 'rise out of water (had risen) = nhô lên khỏi mặt nước.' },
      { id: 'd3-cl-5', type: 'mcq', prompt: 'Blank (5)', options: ['A. in spite of', 'B. instead of', 'C. apart from', 'D. on account of'], answer: 'C', explanation: 'apart from = bên cạnh, ngoài (sự xuất hiện đột ngột của nó).' },
      { id: 'd3-cl-6', type: 'mcq', prompt: 'Blank (6)', options: ['A. prolonged', 'B. remained', 'C. resided', 'D. preserved'], answer: 'B', explanation: 'remained intact = vẫn còn nguyên vẹn.' },
      { id: 'd3-cl-7', type: 'mcq', prompt: 'Blank (7)', options: ['A. quickly', 'B. briskly', 'C. hastily', 'D. speedily'], answer: 'A', explanation: 'quickly realized = nhanh chóng nhận ra.' },
      { id: 'd3-cl-8', type: 'mcq', prompt: 'Blank (8)', options: ['A. delivered', 'B. awarded', 'C. proposed', 'D. offered'], answer: 'D', explanation: 'offer a unique opportunity = mang lại một cơ hội độc nhất.' },
      { id: 'd3-cl-9', type: 'mcq', prompt: 'Blank (9)', options: ['A. regarding', 'B. finding', 'C. seeking', 'D. deciding'], answer: 'B', explanation: 'find + O + adj (finding the island attractive = thấy hòn đảo hấp dẫn).' },
      { id: 'd3-cl-10', type: 'mcq', prompt: 'Blank (10)', options: ['A. prevent', 'B. preserve', 'C. protect', 'D. prohibit'], answer: 'C', explanation: 'protect sth from sb = bảo vệ địa điểm khỏi du khách.' }
    ]
  },

  // 9. ĐỀ 3 - READING PASSAGE C: How Deaf Babies Babble in ASL
  {
    id: 'p-d3-asl',
    examId: 'DE3',
    category: 'READING',
    subType: 'Multiple Choice Reading',
    title: 'Đề 3 - Section A.V Passage C: How Deaf Babies Learn to Communicate (ASL)',
    content: `Most of us know a little about how babies learn to talk. From the time infants are born, they hear language because their parents talk to them all the time. Between the ages of seven and ten months, most infants begin to make sounds. They repeat the same sounds over and over again. This is called babbling. When babies babble, they are practicing their language.

What happens, though, to children who cannot hear? How do deaf children learn to communicate? Recently, doctors have learned that deaf babies babble with their hands. Laura Ann Petitto, a psychologist, observed three hearing infants with English-speaking parents and two deaf infants with deaf parents using American Sign Language (ASL) to communicate. Dr. Petitto studied the babies three times: at 10, 12, and 14 months. During this time, children really begin to develop their language skills.

After watching and videotaping the children for several hundred hours, the psychologist and her assistants made many important observations. For example, they saw that the hearing children made varied motions with their hands. However, there appeared to be no pattern to these motions. The deaf babies also made different movements with their hands, but these movements were more consistent and deliberate. The deaf babies seemed to make the same hand movements over and over again. During the four-month period, the deaf babies' hand motions started to resemble some basic hand-shapes used in ASL. The children also seemed to prefer certain hand-shapes.

Hearing infants start first with simple syllable babbling, then put more syllables together to sound like real sentences and questions. Apparently, deaf babies follow this same pattern, too. First, they repeat simple handshapes. Next, they form some simple hand signs and use these movements together to resemble ASL sentences.

Linguists believe that our ability for language is innate. In other words, humans are born with the capacity for language: It does not matter if we are physically able to speak or not. Language can be expressed in different ways - for instance, by speech or by sign. Dr. Petitto believes this theory and wants to prove it. She plans to study hearing children who have one deaf parent and one hearing parent. She wants to see what happens when babies have the opportunity to learn both sign language and speech.`,
    questions: [
      { id: 'd3-asl-1', type: 'mcq', prompt: '1. According to paragraph 1, babies begin to babble ________', options: ['A. at their first moment after birth', 'B. when they are more than 6 months old', 'C. at their first experience of language', 'D. when they first hear their parents talk to them'], answer: 'B', explanation: 'Đoạn 1: "Between the ages of seven and ten months, most infants begin to make sounds... babbling" (7-10 tháng = hơn 6 tháng tuổi).' },
      { id: 'd3-asl-2', type: 'mcq', prompt: '2. The phrase "the babies" in paragraph 2 refers to ________ in the study.', options: ['A. the deaf infants', 'B. the hearing infants', 'C. the hearing and deaf infants', 'D. the disabled infants'], answer: 'C', explanation: 'Bao gồm cả "three hearing infants... and two deaf infants".' },
      { id: 'd3-asl-4', type: 'mcq', prompt: '4. The word "resemble" in paragraph 3 refers to ________', options: ['A. studying funny movements', 'B. producing similar movements', 'C. making initial movements', 'D. creating strange movements'], answer: 'B', explanation: 'resemble = giống với, tạo ra các chuyển động tương tự.' },
      { id: 'd3-asl-5', type: 'mcq', prompt: '5. It is stated in paragraph 3 that both the deaf and the hearing children made movements with their hand, but ________', options: ['A. only the hearing children made different movements', 'B. the hearing children only repeated the same hand motions', 'C. only the deaf children repeated the same hand motions', 'D. the deaf children made less consistent hand movements'], answer: 'C', explanation: 'Đoạn 3: "The deaf babies seemed to make the same hand movements over and over again."' },
      { id: 'd3-asl-8', type: 'mcq', prompt: '8. It is mentioned in the last paragraph that Dr. Petitto plans to study ________', options: ['A. whether the sign system of the deaf is the physical equivalent of speech', 'B. whether all children speak and make motions with their hand at the same time', 'C. the assumption that the human brain prefers sign language to speech', 'D. what happens when babies have the opportunity to learn both speech and sign language'], answer: 'D', explanation: 'Đoạn cuối: "She wants to see what happens when babies have the opportunity to learn both sign language and speech."' },
      { id: 'd3-asl-9', type: 'mcq', prompt: '9. Which of the following statements is TRUE according to the last paragraph?', options: ['A. Language cannot be expressed in different ways.', 'B. The human brain prefers speech.', 'C. Babies produce spoken words before signed ones.', 'D. Humans are innately able for language.'], answer: 'D', explanation: 'Đoạn cuối: "Linguists believe that our ability for language is innate."' }
    ]
  },

  // 10. WORD FORMATION PASSAGES (CCTV - Đề 1, Halloween - Đề 2, Colorado Skiing - Đề 3)
  {
    id: 'p-wf-passages',
    examId: 'DE1',
    category: 'WORD_FORMATION',
    subType: 'Passage Word Formation',
    title: 'Đề 1, 2 & 3 - Passage Word Formation (CCTV / Halloween / Colorado Skiing)',
    content: `--- PASSAGE 1 (ĐỀ 1): CCTV SURVEILLANCE ---
Word Box: [ BELIEVE | INCLUDE | SIGNIFY | SURPRISE | CRIME | PSYCHOLOGY | SURVEY | RESIDE | HELP | INSTALL ]
The explosive growth in the number of closed-circuit television (CCTV) (11. SURVEY) ________ systems in recent years is transforming city centres in some countries. For some people, the cameras have a (12. PSYCHOLOGY) ________ benefit, taking comfort in the (13. BELIEVE) ________ that they are being watched and protected. In some neighbourhoods, there are even socially (14. INCLUDE) ________ CCTV systems, which allow local (15. RESIDE) ________ to tune in to community TV and watch what is happening outside their front doors. People know the cameras can be (16. HELP) ________ in solving crimes, but are they right to believe that cameras are keeping them safer? According to one university professor of (17. CRIME) ________, they are not. He conducted a study of 14 CCTV systems and found that, in general, the (18. INSTALL) ________ of cameras has (19. SURPRISE) ________ little impact on crime. In only one of the 14 areas could a (20. SIGNIFY) ________ drop in crime levels be linked to CCTV.

--- PASSAGE 2 (ĐỀ 3): SKIING HOLIDAYS IN COLORADO ---
The state of Colorado is known for its spectacular scenery and (21. BREATH) ________ views, which inspire today's travelers as much as they spurred on the (22. SETTLE) ________ who first arrived in this part of the US over a century ago. And whether you're seeking the outdoor adventure of a (23. LIFE) ________, exciting nightlife or a great family getaway, Colorado has everything you need. November through April, snow conditions are (24. CONSIST) ________ and reliable, featuring Colorado's (25. LEGEND) ________ "champagne powder" snow... Together, they present an (26. PARALLEL) ________ winter paradise.`,
    questions: [
      { id: 'd1-wfp-11', type: 'input', prompt: '11. (SURVEY)', answer: 'surveillance', explanation: 'CCTV surveillance systems = hệ thống giám sát CCTV.' },
      { id: 'd1-wfp-12', type: 'input', prompt: '12. (PSYCHOLOGY)', answer: 'psychological', explanation: 'psychological benefit = lợi ích về mặt tâm lý.' },
      { id: 'd1-wfp-13', type: 'input', prompt: '13. (BELIEVE)', answer: 'belief', explanation: 'in the belief that... = với niềm tin rằng.' },
      { id: 'd1-wfp-14', type: 'input', prompt: '14. (INCLUDE)', answer: 'inclusive', explanation: 'socially inclusive = mang tính hòa nhập cộng đồng.' },
      { id: 'd1-wfp-15', type: 'input', prompt: '15. (RESIDE)', answer: 'residents', explanation: 'local residents = cư dân địa phương.' },
      { id: 'd1-wfp-16', type: 'input', prompt: '16. (HELP)', answer: 'helpful', explanation: 'helpful in solving crimes = hữu ích trong việc phá án.' },
      { id: 'd1-wfp-17', type: 'input', prompt: '17. (CRIME)', answer: 'criminology', explanation: 'professor of criminology = giáo sư ngành tội phạm học.' },
      { id: 'd1-wfp-18', type: 'input', prompt: '18. (INSTALL)', answer: 'installation', explanation: 'the installation of cameras = việc lắp đặt camera.' },
      { id: 'd1-wfp-19', type: 'input', prompt: '19. (SURPRISE)', answer: 'surprisingly', explanation: 'surprisingly little impact = tác động ít một cách đáng ngạc nhiên.' },
      { id: 'd1-wfp-20', type: 'input', prompt: '20. (SIGNIFY)', answer: 'significant', explanation: 'a significant drop = sự sụt giảm đáng kể.' },
      { id: 'd3-wfp-21', type: 'input', prompt: '21. (BREATH)', answer: 'breathtaking', explanation: 'breathtaking views = khung cảnh đẹp ngoạn mục.' },
      { id: 'd3-wfp-22', type: 'input', prompt: '22. (SETTLE)', answer: 'settlers', explanation: 'the settlers = những người khai hoang định cư đầu tiên.' },
      { id: 'd3-wfp-23', type: 'input', prompt: '23. (LIFE)', answer: 'lifetime', explanation: 'adventure of a lifetime = chuyến phiêu lưu để đời.' },
      { id: 'd3-wfp-24', type: 'input', prompt: '24. (CONSIST)', answer: 'consistent', explanation: 'consistent and reliable = ổn định và đáng tin cậy.' },
      { id: 'd3-wfp-25', type: 'input', prompt: '25. (LEGEND)', answer: 'legendary', explanation: 'legendary snow = lớp tuyết huyền thoại.' },
      { id: 'd3-wfp-26', type: 'input', prompt: '26. (PARALLEL)', answer: 'unparalleled', explanation: 'unparalleled winter paradise = thiên đường mùa đông vô song / không đâu sánh bằng.' }
    ]
  }
];

// ============================================================================
// VIP FLASHCARDS DATA (IDIOMS, PHRASAL VERBS, WORD FAMILIES FROM ĐỀ 1, 2, 3)
// ============================================================================
const VIP_FLASHCARDS = [
  { term: 'change horses in midstream', type: 'Idiom (Đề 1)', meaning: 'Thay đổi kế hoạch / định hướng quan trọng giữa chừng', example: 'She went to college to study history, but changed horses in midstream and is now a doctor.' },
  { term: 'be none the wiser', type: 'Idiom (Đề 1)', meaning: 'Vẫn mù tịt, không hiểu thêm được chút nào', example: "I saw the last episode of the series, but I'm none the wiser about what really happened." },
  { term: 'a fly in the ointment', type: 'Idiom (Đề 1)', meaning: 'Con sâu làm rầu nồi canh (một điểm trừ làm hỏng sự hoàn hảo)', example: 'I like my new job; the only fly in the ointment is working every other weekend.' },
  { term: 'pare sth to the bone', type: 'Idiom (Đề 1)', meaning: 'Cắt giảm tối đa đến mức tối thiểu', example: 'The workforce has been pared to the bone.' },
  { term: 'on pins and needles', type: 'Idiom (Đề 2)', meaning: 'Hồi hộp, lo lắng như ngồi trên đống lửa', example: "I'll be on pins and needles all weekend waiting for the test results." },
  { term: 'home and dry', type: 'Idiom (Đề 2)', meaning: 'Thành công mỹ mãn, nắm chắc phần thắng', example: 'I could see the finish line and thought I was home and dry.' },
  { term: 'put sb out to grass', type: 'Idiom (Đề 3)', meaning: 'Cho ai nghỉ hưu vì đã lớn tuổi', example: 'Since he is too old to be a porter, they have decided to put him out to grass.' },
  { term: 'up to scratch', type: 'Idiom (Đề 1)', meaning: 'Đạt chuẩn, đủ chất lượng yêu cầu', example: "Peter doesn't blog as his writing skills aren't up to scratch." },
  { term: 'unconscionable', type: 'Word Form (Đề 2)', meaning: '(adj) Vô lương tâm, quá đáng không thể chấp nhận (từ gốc: CONSCIENCE)', example: 'Taking that old lady for a ride is unconscionable.' },
  { term: 'do away with', type: 'Phrasal Verb (Đề 1)', meaning: 'Bãi bỏ, xóa bỏ hoàn toàn (abolish)', example: 'All countries should do away with the death penalty.' },
  { term: 'brush up on', type: 'Phrasal Verb (Đề 1)', meaning: 'Ôn lại, trau dồi lại kiến thức/kỹ năng bị mai một', example: "I'm going to have to brush up on my spoken German before I go to Munich." },
  { term: 'get one\'s own back (on sb)', type: 'Idiom (Đề 3)', meaning: 'Trả đũa, phục thù ai', example: 'He finally got his own back on her after the prank.' }
];

// SAMPLE RAW EXAM TEXT FOR ONE-CLICK AI PARSER DEMO (ĐỀ SỐ 4)
const SAMPLE_DE4_RAW_TEXT = `ĐỀ THI CHỌN HỌC SINH GIỎI CẤP TỈNH - ĐỀ SỐ 4 (UPLOAD DEMO)
Môn: Tiếng Anh - Thời gian: 180 phút

I. GRAMMAR AND STRUCTURES
1. Little ________ that the police were already waiting for him outside the bank.
A. did the suspect know
B. the suspect knew
C. was the suspect knowing
D. knew the suspect
ANSWER: A
EXPLANATION: Đảo ngữ với "Little" đứng đầu câu: Little + trợ động từ (did) + S + V_inf.

2. Had it not been for your timely intervention, the negotiations ________ in disaster.
A. would end
B. would have ended
C. will end
D. had ended
ANSWER: B
EXPLANATION: Đảo ngữ câu điều kiện loại 3: Had it not been for + N, S + would have P2.

II. PHRASAL VERBS AND VOCABULARY
3. The committee decided to ________ the proposal until the next financial quarter.
A. hold over
B. bring about
C. gjøre away with
D. fall through
ANSWER: A
EXPLANATION: hold over = trì hoãn, để lại xử lý sau.

4. Winning the provincial English championship was a real feather in her ________.
A. hat
B. cap
C. coat
D. crown
ANSWER: B
EXPLANATION: Idiom "a feather in one's cap": một thành tích đáng tự hào.

III. READING COMPREHENSION
PASSAGE:
Artificial Intelligence in Modern Linguistics
The rapid proliferation of large language models has fundamentally altered how linguists analyze human syntax and semantics. Historically, Noam Chomsky argued that the capacity for grammar is hardwired into the human brain—a concept known as Universal Grammar. However, contemporary neural networks have demonstrated an uncanny ability to master complex idiomatic expressions and contextual nuances purely through statistical exposure to vast corpora of text. While critics maintain that machines merely mimic understanding without genuine consciousness, educators are increasingly leveraging these tools to personalize second-language acquisition for gifted students.
END_PASSAGE

5. What is the main contrast presented in the passage?
A. Traditional innate grammar theories versus statistical learning by neural networks.
B. Spoken languages versus sign languages in infants.
C. British English versus American English syntax.
D. Human teachers versus robotic classroom assistants.
ANSWER: A
EXPLANATION: Đoạn văn đối chiếu lý thuyết Universal Grammar bẩm sinh của Chomsky với khả năng học thống kê của mạng nơ-ron hiện đại.

IV. WORD FORMATION
6. The speaker's argument was so (CONVINCE) ________ that nobody voted for the motion.
ANSWER: unconvincing
EXPLANATION: Cần tính từ mang nghĩa phủ định: unconvincing (thiếu thuyết phục) vì không ai bỏ phiếu ủng hộ.

V. SENTENCE TRANSFORMATION
7. Immediately after the captain announced the delay, the passengers started complaining. (SOONER)
ANSWER: No sooner had the captain announced the delay than the passengers started complaining.
EXPLANATION: Cấu trúc đảo ngữ: No sooner + had + S + P2 + than + S + V_ed.`;

const CATEGORIES = [
  { id: 'ALL', name: 'Tất Cả Chuyên Đề', icon: Layers, color: 'text-indigo-400', bg: 'bg-indigo-500/10 border-indigo-500/30' },
  { id: 'GRAMMAR', name: '1. Grammar & Structures', icon: Brain, color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/30' },
  { id: 'PHRASAL_VERBS', name: '2. Phrasal Verbs & Prep', icon: Zap, color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/30' },
  { id: 'VOCABULARY', name: '3. Advanced Vocab & Idioms', icon: Sparkles, color: 'text-purple-400', bg: 'bg-purple-500/10 border-purple-500/30' },
  { id: 'CLOZE', name: '4. Guided & Open Cloze', icon: SplitSquareVertical, color: 'text-cyan-400', bg: 'bg-cyan-500/10 border-cyan-500/30' },
  { id: 'READING', name: '5. Reading & Gapped Text', icon: BookOpen, color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/30' },
  { id: 'ERROR_ID', name: '6. Error Proofreading', icon: ShieldAlert, color: 'text-rose-400', bg: 'bg-rose-500/10 border-rose-500/30' },
  { id: 'WORD_FORMATION', name: '7. Word Formation (C1/C2)', icon: PenTool, color: 'text-orange-400', bg: 'bg-orange-500/10 border-orange-500/30' },
  { id: 'TRANSFORMATION', name: '8. Sentence Transformation', icon: RefreshCw, color: 'text-pink-400', bg: 'bg-pink-500/10 border-pink-500/30' },
];

export default function App() {
  // Navigation & Core State
  const [activeTab, setActiveTab] = useState('PRACTICE'); // PRACTICE | MOCK_EXAM | UPLOADER | FLASHCARDS
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedExamFilter, setSelectedExamFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Question & Passage Banks (Stateful so uploaded exams integrate seamlessly)
  const [questions, setQuestions] = useState(INITIAL_QUESTIONS);
  const [passages, setPassages] = useState(INITIAL_PASSAGES);
  const [examsList, setExamsList] = useState([
    { id: 'DE1', title: 'ĐỀ CHÍNH THỨC SỐ 1 (2026)', subtitle: 'Multiple Choice + Effective Learning + Hippos Gapped Text + WHO Health + CCTV + Rewrite', duration: 180 },
    { id: 'DE2', title: 'ĐỀ CHÍNH THỨC SỐ 2 (2026)', subtitle: 'Listening Sim + Lexico-Grammar + American Railroads + Space Junk + Proofreading + Halloween', duration: 180 },
    { id: 'DE3', title: 'ĐỀ CHÍNH THỨC SỐ 3 (2026)', subtitle: 'Grammar + Mysterious Isle + Global Warming + Deaf Babies ASL + Dreams + Colorado Skiing', duration: 180 }
  ]);

  // Gamification & User Progress State
  const [xp, setXp] = useState(1450);
  const [combo, setCombo] = useState(1);
  const [streak, setStreak] = useState(7);
  const [userAnswers, setUserAnswers] = useState({}); // { questionId: userValue }
  const [checkedStatus, setCheckedStatus] = useState({}); // { questionId: 'correct' | 'wrong' }
  const [showExplanation, setShowExplanation] = useState({});
  const [bookmarkedIds, setBookmarkedIds] = useState(['d1-v-26', 'd1-st-6', 'd2-wf-5']);
  const [rewardToast, setRewardToast] = useState(null);

  // Pomodoro Focus Timer
  const [pomoSeconds, setPomoSeconds] = useState(25 * 60);
  const [pomoRunning, setPomoRunning] = useState(false);

  // Mock Exam Mode State
  const [activeMockExamId, setActiveMockExamId] = useState('DE1');
  const [mockStarted, setMockStarted] = useState(false);
  const [mockSubmitted, setMockSubmitted] = useState(false);
  const [mockTimeLeft, setMockTimeLeft] = useState(180 * 60);
  const [mockAnswers, setMockAnswers] = useState({});
  const [mockFlagged, setMockFlagged] = useState({});
  const [essayText, setEssayText] = useState('');

  // Upload & Auto-Parser State
  const [rawUploadText, setRawUploadText] = useState('');
  const [newExamTitle, setNewExamTitle] = useState('ĐỀ THI HSG CẤP TỈNH SỐ 4 (CUSTOM)');
  const [newExamCode, setNewExamCode] = useState('DE4');
  const [parsePreview, setParsePreview] = useState(null);
  const [uploadSuccessBanner, setUploadSuccessBanner] = useState(null);

  // Flashcards State
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [cardFlipped, setCardFlipped] = useState(false);

  // Pomodoro Timer Effect
  useEffect(() => {
    if (!pomoRunning) return;
    const timer = setInterval(() => {
      setPomoSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [pomoRunning]);

  // Mock Exam Timer Effect
  useEffect(() => {
    if (!mockStarted || mockSubmitted) return;
    const timer = setInterval(() => {
      setMockTimeLeft((prev) => {
        if (prev <= 1) {
          setMockSubmitted(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [mockStarted, mockSubmitted]);

  // Helper: Format MM:SS or HH:MM:SS
  const formatTime = (secs, showHours = false) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    if (showHours) {
      return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    }
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  // Helper: Normalize string for flexible grading
  const normalizeStr = (str = '') =>
    str
      .toLowerCase()
      .trim()
      .replace(/[.,!?;:'"]/g, '')
      .replace(/\s+/g, ' ');

  // Check if an answer is correct
  const verifyAnswer = (q, userVal) => {
    if (!userVal) return false;
    if (q.type === 'mcq') {
      const cleanUser = userVal.trim().toUpperCase();
      const cleanAns = q.answer.trim().toUpperCase();
      return cleanUser === cleanAns || cleanUser.startsWith(cleanAns + '.');
    }
    const normUser = normalizeStr(userVal);
    const normAns = normalizeStr(q.answer);
    if (normUser === normAns) return true;
    if (q.acceptAlt && q.acceptAlt.some((alt) => normalizeStr(alt) === normUser)) {
      return true;
    }
    // Partial keyword match for long sentence transformations if core structure is present
    if (q.category === 'TRANSFORMATION' && normUser.length > 10 && normAns.includes(normUser)) {
      return true;
    }
    return false;
  };

  // Handle instant check in Practice Mode
  const handleCheckQuestion = (q) => {
    const val = userAnswers[q.id];
    if (!val || !val.trim()) return;
    const isCorrect = verifyAnswer(q, val);

    setCheckedStatus((prev) => ({ ...prev, [q.id]: isCorrect ? 'correct' : 'wrong' }));
    setShowExplanation((prev) => ({ ...prev, [q.id]: true }));

    if (isCorrect) {
      const gainedXp = 25 * combo;
      setXp((prev) => prev + gainedXp);
      setCombo((prev) => Math.min(prev + 1, 10));
      setRewardToast({
        type: 'success',
        text: `CHÍNH XÁC! +${gainedXp} XP (Combo x${combo})`
      });
    } else {
      setCombo(1);
      setRewardToast({
        type: 'error',
        text: 'Chưa chính xác! Đã lưu vào Sổ Tay Câu Sai để ôn lại.'
      });
    }
    setTimeout(() => setRewardToast(null), 2600);
  };

  // Toggle Bookmark
  const toggleBookmark = (id) => {
    setBookmarkedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Calculate Overall Stats
  const stats = useMemo(() => {
    const allPassageQuestions = passages.flatMap((p) => p.questions);
    const totalCount = questions.length + allPassageQuestions.length;
    const answeredIds = Object.keys(checkedStatus);
    const correctCount = answeredIds.filter((id) => checkedStatus[id] === 'correct').length;
    const wrongCount = answeredIds.filter((id) => checkedStatus[id] === 'wrong').length;
    const accuracy = answeredIds.length > 0 ? Math.round((correctCount / answeredIds.length) * 100) : 0;
    const level = Math.floor(xp / 500) + 1;
    const levelProgress = Math.round(((xp % 500) / 500) * 100);

    return { totalCount, answeredCount: answeredIds.length, correctCount, wrongCount, accuracy, level, levelProgress };
  }, [questions, passages, checkedStatus, xp]);

  // Filtered Standalone Questions & Passages for Practice Mode
  const filteredStandalone = useMemo(() => {
    return questions.filter((q) => {
      const matchCat = selectedCategory === 'ALL' || q.category === selectedCategory;
      const matchExam = selectedExamFilter === 'ALL' || q.examId === selectedExamFilter;
      const matchSearch =
        !searchQuery ||
        q.prompt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (q.explanation && q.explanation.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCat && matchExam && matchSearch;
    });
  }, [questions, selectedCategory, selectedExamFilter, searchQuery]);

  const filteredPassages = useMemo(() => {
    return passages.filter((p) => {
      const matchCat = selectedCategory === 'ALL' || p.category === selectedCategory;
      const matchExam = selectedExamFilter === 'ALL' || p.examId === selectedExamFilter;
      const matchSearch =
        !searchQuery ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.content.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchExam && matchSearch;
    });
  }, [passages, selectedCategory, selectedExamFilter, searchQuery]);

  // ============================================================================
  // SMART AI EXAM PARSER ENGINE (PARSE UPLOADED FILES OR RAW TEXT)
  // ============================================================================
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target.result;
      setRawUploadText(content);
      const baseName = file.name.replace(/\.[^/.]+$/, '');
      setNewExamTitle(`ĐỀ UPLOAD: ${baseName.toUpperCase()}`);
      setNewExamCode(`DE_${Date.now().toString().slice(-3)}`);
    };
    reader.readAsText(file);
  };

  const runSmartParser = (inputText = rawUploadText) => {
    if (!inputText || !inputText.trim()) return;

    const lines = inputText.split(/\r?\n/);
    let currentCategory = 'GRAMMAR';
    let inPassage = false;
    let currentPassageText = [];
    let currentPassageTitle = 'Bài đọc trích xuất tự động';
    const parsedStandalone = [];
    const parsedPassages = [];
    let activePassageObj = null;

    let currentQ = null;

    const saveCurrentQuestion = () => {
      if (!currentQ) return;
      if (currentQ.options && currentQ.options.length >= 2) {
        currentQ.type = 'mcq';
        if (!currentQ.answer) currentQ.answer = 'A';
      } else {
        currentQ.type = 'input';
        if (!currentQ.answer) currentQ.answer = 'key';
      }
      if (!currentQ.explanation) {
        currentQ.explanation = 'Được trích xuất tự động từ trình phân tích đề HSG.';
      }

      if (activePassageObj && (currentCategory === 'READING' || currentCategory === 'CLOZE')) {
        activePassageObj.questions.push(currentQ);
      } else {
        parsedStandalone.push(currentQ);
      }
      currentQ = null;
    };

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      // Detect Section Headers
      const upper = line.toUpperCase();
      if (upper.includes('GRAMMAR') || upper.includes('NGỮ PHÁP')) {
        saveCurrentQuestion();
        currentCategory = 'GRAMMAR';
        activePassageObj = null;
        continue;
      }
      if (upper.includes('PHRASAL VERB') || upper.includes('PREPOSITION')) {
        saveCurrentQuestion();
        currentCategory = 'PHRASAL_VERBS';
        activePassageObj = null;
        continue;
      }
      if (upper.includes('VOCABULARY') || upper.includes('LEXICO')) {
        saveCurrentQuestion();
        currentCategory = 'VOCABULARY';
        activePassageObj = null;
        continue;
      }
      if (upper.includes('CLOZE')) {
        saveCurrentQuestion();
        currentCategory = 'CLOZE';
        continue;
      }
      if (upper.includes('READING COMPREHENSION') || upper.startsWith('PASSAGE:')) {
        saveCurrentQuestion();
        currentCategory = 'READING';
        if (upper.startsWith('PASSAGE:')) {
          inPassage = true;
          currentPassageText = [];
          currentPassageTitle = line.replace(/^PASSAGE:\s*/i, '') || `${newExamTitle} - Reading Passage`;
          continue;
        }
      }
      if (upper.startsWith('END_PASSAGE')) {
        inPassage = false;
        activePassageObj = {
          id: `p-${newExamCode}-${parsedPassages.length + 1}`,
          examId: newExamCode,
          category: currentCategory === 'CLOZE' ? 'CLOZE' : 'READING',
          subType: 'Auto-Extracted Passage',
          title: currentPassageTitle,
          content: currentPassageText.join('\n'),
          questions: []
        };
        parsedPassages.push(activePassageObj);
        continue;
      }
      if (inPassage) {
        if (currentPassageText.length === 0 && line.length < 90 && !line.endsWith('.')) {
          currentPassageTitle = `${newExamCode}: ${line}`;
        }
        currentPassageText.push(line);
        continue;
      }
      if (upper.includes('WORD FORMATION') || upper.includes('WORD FORM')) {
        saveCurrentQuestion();
        currentCategory = 'WORD_FORMATION';
        activePassageObj = null;
        continue;
      }
      if (upper.includes('SENTENCE TRANSFORMATION') || upper.includes('REWRITE')) {
        saveCurrentQuestion();
        currentCategory = 'TRANSFORMATION';
        activePassageObj = null;
        continue;
      }

      // Detect Answer or Explanation tags
      if (/^(ANSWER|KEY|ĐÁP ÁN)\s*:/i.test(line)) {
        if (currentQ) {
          currentQ.answer = line.replace(/^(ANSWER|KEY|ĐÁP ÁN)\s*:\s*/i, '').trim();
        }
        continue;
      }
      if (/^(EXPLANATION|GIẢI THÍCH)\s*:/i.test(line)) {
        if (currentQ) {
          currentQ.explanation = line.replace(/^(EXPLANATION|GIẢI THÍCH)\s*:\s*/i, '').trim();
        }
        continue;
      }

      // Detect Options A. B. C. D.
      const optionMatch = line.match(/^([A-D])\.\s+(.*)/);
      if (optionMatch && currentQ) {
        // Check if multiple options are on the same line (e.g. A. xxx B. yyy C. zzz D. www)
        const multiOptions = line.split(/(?=\b[A-D]\.\s)/);
        multiOptions.forEach((opt) => {
          if (opt.trim()) currentQ.options.push(opt.trim());
        });
        continue;
      }

      // Detect Question Start (e.g. "1. ", "Câu 1:", etc.)
      const qMatch = line.match(/^(?:Câu\s+)?(\d+)[.)]\s+(.*)/i);
      if (qMatch) {
        saveCurrentQuestion();
        const qNum = qMatch[1];
        const qText = qMatch[2];
        const rootMatch = qText.match(/\(([A-Z]{3,})\)/);
        currentQ = {
          id: `${newExamCode.toLowerCase()}-q-${qNum}-${Date.now().toString().slice(-3)}`,
          examId: newExamCode,
          category: currentCategory,
          prompt: `${qNum} (${newExamCode}). ${qText}`,
          options: [],
          rootWord: rootMatch ? rootMatch[1] : undefined,
          answer: '',
          explanation: ''
        };
        continue;
      }

      // Detect Rewrite arrow line "→ ..."
      if ((line.startsWith('→') || line.startsWith('->')) && currentQ) {
        currentQ.prompt += `\n${line}`;
        continue;
      }
    }

    saveCurrentQuestion();

    setParsePreview({
      examId: newExamCode,
      title: newExamTitle,
      standaloneCount: parsedStandalone.length,
      passagesCount: parsedPassages.length,
      standalone: parsedStandalone,
      passages: parsedPassages
    });
  };

  const confirmImportExam = () => {
    if (!parsePreview) return;
    setQuestions((prev) => [...parsePreview.standalone, ...prev]);
    setPassages((prev) => [...parsePreview.passages, ...prev]);
    setExamsList((prev) => [
      ...prev,
      {
        id: parsePreview.examId,
        title: parsePreview.title,
        subtitle: `${parsePreview.standaloneCount} câu đơn + ${parsePreview.passagesCount} bài đọc dài trích xuất tự động`,
        duration: 180
      }
    ]);
    setUploadSuccessBanner(
      `Đã tạo thành công "${parsePreview.title}" (${parsePreview.examId})! Toàn bộ câu hỏi đã được phân vào 8 Chuyên đề và Phòng Thi Thử.`
    );
    setParsePreview(null);
    setXp((prev) => prev + 200);
  };

  // ============================================================================
  // MOCK EXAM QUESTIONS AGGREGATOR
  // ============================================================================
  const mockExamData = useMemo(() => {
    const standalone = questions.filter((q) => q.examId === activeMockExamId);
    const examPassages = passages.filter((p) => p.examId === activeMockExamId);
    const passageQs = examPassages.flatMap((p) => p.questions);
    const allQs = [...standalone, ...passageQs];
    return { standalone, examPassages, allQs };
  }, [questions, passages, activeMockExamId]);

  const mockScoreReport = useMemo(() => {
    if (!mockSubmitted) return null;
    let correct = 0;
    const total = mockExamData.allQs.length;
    mockExamData.allQs.forEach((q) => {
      if (verifyAnswer(q, mockAnswers[q.id])) {
        correct++;
      }
    });
    const scaledScore = total > 0 ? ((correct / total) * 20).toFixed(2) : '0.00';
    return { correct, total, scaledScore, percentage: total > 0 ? Math.round((correct / total) * 100) : 0 };
  }, [mockSubmitted, mockExamData, mockAnswers]);

  // Mistake Bank for Flashcards Tab
  const mistakeQuestions = useMemo(() => {
    const allQs = [...questions, ...passages.flatMap((p) => p.questions)];
    return allQs.filter((q) => checkedStatus[q.id] === 'wrong' || bookmarkedIds.includes(q.id));
  }, [questions, passages, checkedStatus, bookmarkedIds]);

  // ============================================================================
  // UI RENDER HELPERS
  // ============================================================================
  const renderQuestionCard = (q, isMock = false) => {
    const currentVal = isMock ? mockAnswers[q.id] || '' : userAnswers[q.id] || '';
    const status = isMock
      ? mockSubmitted
        ? verifyAnswer(q, currentVal)
          ? 'correct'
          : 'wrong'
        : null
      : checkedStatus[q.id];
    const isBookmarked = bookmarkedIds.includes(q.id);
    const isFlagged = mockFlagged[q.id];

    const handleSelectValue = (val) => {
      if (isMock) {
        if (mockSubmitted) return;
        setMockAnswers((prev) => ({ ...prev, [q.id]: val }));
      } else {
        setUserAnswers((prev) => ({ ...prev, [q.id]: val }));
      }
    };

    return (
      <div
        key={q.id}
        id={`q-card-${q.id}`}
        className={`rounded-xl border p-4 transition-all ${
          status === 'correct'
            ? 'bg-emerald-950/25 border-emerald-500/50'
            : status === 'wrong'
            ? 'bg-rose-950/25 border-rose-500/50'
            : 'bg-slate-900/90 border-slate-800 hover:border-slate-700'
        }`}
      >
        {/* Top Metadata Row */}
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              {q.examId || activeMockExamId}
            </span>
            {q.category && (
              <span className="px-2 py-0.5 text-[11px] font-semibold rounded bg-slate-800 text-slate-300 border border-slate-700">
                {q.category}
              </span>
            )}
            {q.rootWord && (
              <span className="px-2 py-0.5 text-[11px] font-mono font-bold rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
                KEYWORD: {q.rootWord}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5">
            {isMock && (
              <button
                onClick={() => setMockFlagged((prev) => ({ ...prev, [q.id]: !prev[q.id] }))}
                className={`px-2 py-1 rounded text-xs font-medium flex items-center gap-1 border transition ${
                  isFlagged
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                    : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200'
                }`}
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                {isFlagged ? 'Đã gắn cờ' : 'Xem lại'}
              </button>
            )}
            <button
              onClick={() => toggleBookmark(q.id)}
              title="Lưu vào Sổ tay câu khó"
              className={`p-1.5 rounded-lg border transition ${
                isBookmarked
                  ? 'bg-amber-500/20 border-amber-500/40 text-amber-400'
                  : 'bg-slate-800/80 border-slate-700 text-slate-400 hover:text-slate-200'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5 fill-current" />
            </button>
          </div>
        </div>

        {/* Question Prompt */}
        <p className="text-sm md:text-[15px] font-medium text-slate-100 whitespace-pre-line leading-relaxed mb-3.5">
          {q.prompt}
        </p>

        {/* MCQ Options OR Text Input */}
        {q.type === 'mcq' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {q.options.map((opt, idx) => {
              const letter = opt.trim().charAt(0);
              const isSelected = currentVal === letter || currentVal === opt;
              const isCorrectAnswer =
                (status || (isMock && mockSubmitted)) &&
                (q.answer === letter || q.answer === opt.trim());

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectValue(q.options[0].includes('.') ? letter : opt)}
                  className={`text-left px-3.5 py-2.5 rounded-lg border text-xs md:text-sm font-medium transition-all flex items-center justify-between gap-2 ${
                    isCorrectAnswer
                      ? 'bg-emerald-500/25 border-emerald-400 text-emerald-200 shadow-sm shadow-emerald-500/10'
                      : isSelected && status === 'wrong'
                      ? 'bg-rose-500/25 border-rose-400 text-rose-200'
                      : isSelected
                      ? 'bg-indigo-600/30 border-indigo-400 text-indigo-100 ring-1 ring-indigo-400/40'
                      : 'bg-slate-950/70 border-slate-800 text-slate-300 hover:bg-slate-800/70 hover:border-slate-700'
                  }`}
                >
                  <span>{opt}</span>
                  {isCorrectAnswer && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                  {isSelected && status === 'wrong' && <XCircle className="w-4 h-4 text-rose-400 shrink-0" />}
                </button>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={currentVal}
              onChange={(e) => handleSelectValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !isMock) handleCheckQuestion(q);
              }}
              placeholder="Nhập đáp án của bạn (Word form / Từ điền / Viết lại câu)..."
              className="flex-1 bg-slate-950 border border-slate-700 focus:border-indigo-500 focus:outline-none rounded-lg px-3.5 py-2 text-sm text-slate-100 placeholder-slate-500 font-mono"
            />
          </div>
        )}

        {/* Action & Explanation Footer (Practice Mode or Submitted Mock) */}
        {!isMock && (
          <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleCheckQuestion(q)}
                className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold tracking-wide flex items-center gap-1.5 shadow-sm transition cursor-pointer"
              >
                <Check className="w-3.5 h-3.5" />
                Kiểm Tra Đáp Án
              </button>
              <button
                onClick={() =>
                  setShowExplanation((prev) => ({ ...prev, [q.id]: !prev[q.id] }))
                }
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium flex items-center gap-1 transition cursor-pointer"
              >
                <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                {showExplanation[q.id] ? 'Ẩn Giải Thích' : 'Xem Key & Giải Thích'}
              </button>
            </div>

            {status && (
              <span
                className={`text-xs font-bold flex items-center gap-1 ${
                  status === 'correct' ? 'text-emerald-400' : 'text-rose-400'
                }`}
              >
                {status === 'correct' ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" /> Chính xác (+{25 * Math.max(1, combo - 1)} XP)
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4" /> Sai rồi — Xem kỹ giải thích bên dưới!
                  </>
                )}
              </span>
            )}
          </div>
        )}

        {/* Detailed Explanation Box */}
        {(showExplanation[q.id] || (isMock && mockSubmitted)) && (
          <div className="mt-3 p-3 rounded-lg bg-slate-950/90 border border-indigo-500/30 text-xs space-y-1">
            <div className="flex items-center gap-2 text-emerald-400 font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>ĐÁP ÁN CHUẨN: {q.answer}</span>
              {q.acceptAlt && (
                <span className="text-slate-400 font-normal">
                  (Chấp nhận: {q.acceptAlt.join(' / ')})
                </span>
              )}
            </div>
            <p className="text-slate-300 leading-relaxed">{q.explanation}</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Floating Reward Toast */}
      {rewardToast && (
        <div
          className={`fixed bottom-5 right-5 z-50 px-4 py-3 rounded-xl border shadow-2xl flex items-center gap-2.5 animate-bounce ${
            rewardToast.type === 'success'
              ? 'bg-emerald-950/95 border-emerald-400 text-emerald-200'
              : 'bg-rose-950/95 border-rose-400 text-rose-200'
          }`}
        >
          {rewardToast.type === 'success' ? (
            <Zap className="w-5 h-5 text-amber-400 fill-amber-400" />
          ) : (
            <AlertTriangle className="w-5 h-5 text-rose-400" />
          )}
          <span className="text-sm font-bold">{rewardToast.text}</span>
        </div>
      )}

      {/* ==================================================================== */}
      {/* TOP GAMIFIED CYBER-ACADEMIC COMMAND BAR */}
      {/* ==================================================================== */}
      <header className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur-md border-b border-slate-800 px-3 lg:px-6 py-2.5">
        <div className="max-w-[1600px] mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-600 to-emerald-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 border border-white/10">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-sm md:text-base font-black tracking-tight bg-gradient-to-r from-white via-indigo-200 to-emerald-300 bg-clip-text text-transparent">
                  HSG TIẾNG ANH CẤP TỈNH PRO HUB
                </h1>
                <span className="px-2 py-0.5 text-[10px] font-black uppercase rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  2026 EDITION
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Hệ thống phân tách 8 Chuyên đề C1/C2 • Phòng Thi Thử Đề 1, 2, 3 • AI Auto-Upload Đề Mới
              </p>
            </div>
          </div>

          {/* Dense Gamification & Pomodoro Widgets */}
          <div className="flex items-center flex-wrap gap-2 md:gap-3">
            {/* Level & XP Bar */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-1.5 flex items-center gap-2.5">
              <div className="flex items-center gap-1 text-amber-400 font-black text-xs">
                <Trophy className="w-4 h-4" />
                <span>LV.{stats.level}</span>
              </div>
              <div className="w-24 hidden sm:block">
                <div className="flex justify-between text-[10px] text-slate-400 mb-0.5">
                  <span>{xp} XP</span>
                  <span>{stats.levelProgress}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 transition-all duration-300"
                    style={{ width: `${stats.levelProgress}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Combo Multiplier */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl px-2.5 py-1.5 flex items-center gap-1.5">
              <Zap className={`w-4 h-4 ${combo > 1 ? 'text-amber-400 fill-amber-400 animate-pulse' : 'text-slate-500'}`} />
              <span className="text-xs font-black text-amber-300">COMBO x{combo}</span>
            </div>

            {/* Streak */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl px-2.5 py-1.5 flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
              <span className="text-xs font-bold text-orange-300">{streak} Ngày</span>
            </div>

            {/* Accuracy Badge */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl px-2.5 py-1.5 flex items-center gap-1.5">
              <Target className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-bold text-emerald-300">
                {stats.correctCount}/{stats.totalCount} ({stats.accuracy}%)
              </span>
            </div>

            {/* Built-in Pomodoro Focus Timer */}
            <div className="bg-slate-900 border border-indigo-500/40 rounded-xl px-2.5 py-1 flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-indigo-400" />
              <span className="font-mono text-xs font-bold text-indigo-200">
                {formatTime(pomoSeconds)}
              </span>
              <button
                onClick={() => setPomoRunning(!pomoRunning)}
                className="p-1 rounded bg-indigo-600/40 hover:bg-indigo-600 text-white transition"
                title="Bật/Tắt Pomodoro 25p"
              >
                {pomoRunning ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
              </button>
              <button
                onClick={() => {
                  setPomoRunning(false);
                  setPomoSeconds(25 * 60);
                }}
                className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
                title="Reset Pomodoro"
              >
                <RotateCcw className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Navigation Bar (4 Core Modes) */}
        <div className="max-w-[1600px] mx-auto mt-2.5 pt-2 border-t border-slate-900 flex items-center gap-2 overflow-x-auto no-scrollbar">
          {[
            { id: 'PRACTICE', label: '1. LUYỆN TẬP THEO 8 CHUYÊN ĐỀ', icon: Layers, badge: `${stats.totalCount} Câu` },
            { id: 'MOCK_EXAM', label: '2. PHÒNG THI THỬ ĐẦY ĐỦ (ĐỀ 1, 2, 3+)', icon: Award, badge: `${examsList.length} Đề` },
            { id: 'UPLOADER', label: '3. UPLOAD ĐỀ KHÁC & TỰ TẠO BÀI TẬP AI', icon: Upload, badge: 'AUTO PARSER' },
            { id: 'FLASHCARDS', label: '4. SỔ TAY CÂU SAI & FLASHCARDS C1/C2', icon: Sparkles, badge: `${mistakeQuestions.length} Lưu` }
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 shrink-0 border transition-all cursor-pointer ${
                  active
                    ? 'bg-indigo-600 text-white border-indigo-400 shadow-lg shadow-indigo-600/25'
                    : 'bg-slate-900/90 text-slate-400 border-slate-800 hover:bg-slate-800 hover:text-slate-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                <span
                  className={`px-1.5 py-0.5 text-[10px] rounded-md ${
                    active ? 'bg-indigo-900/80 text-indigo-200' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {tab.badge}
                </span>
              </button>
            );
          })}
        </div>
      </header>

      {/* ==================================================================== */}
      {/* MAIN WORKSPACE CONTENT */}
      {/* ==================================================================== */}
      <main className="flex-1 max-w-[1600px] w-full mx-auto px-3 lg:px-6 py-4">
        {/* ================================================================ */}
        {/* TAB 1: CATEGORIZED PRACTICE HUB (8 CHUYÊN ĐỀ BÀI BẢN) */}
        {/* ================================================================ */}
        {activeTab === 'PRACTICE' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Left Sidebar: 8 Categorized Modules + Filters + Progress Radar */}
            <aside className="lg:col-span-3 space-y-3">
              {/* Filter by Source Exam */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3.5">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center justify-between">
                  <span>Lọc Theo Nguồn Đề Thi</span>
                  <Filter className="w-3.5 h-3.5 text-indigo-400" />
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  <button
                    onClick={() => setSelectedExamFilter('ALL')}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-bold border transition ${
                      selectedExamFilter === 'ALL'
                        ? 'bg-indigo-600/30 border-indigo-400 text-indigo-200'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Tất cả ({examsList.length} Đề)
                  </button>
                  {examsList.map((ex) => (
                    <button
                      key={ex.id}
                      onClick={() => setSelectedExamFilter(ex.id)}
                      className={`px-2.5 py-1.5 rounded-lg text-xs font-bold border truncate transition ${
                        selectedExamFilter === ex.id
                          ? 'bg-emerald-600/30 border-emerald-400 text-emerald-200'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {ex.id}
                    </button>
                  ))}
                </div>

                {/* Search Input */}
                <div className="mt-2.5 relative">
                  <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Tìm từ khóa, cấu trúc, idiom..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 focus:border-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* 8 Categorized Question Modules */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3 space-y-1.5">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1 mb-2">
                  Phân Chia 8 Dạng Bài Tập HSG
                </div>
                {CATEGORIES.map((cat) => {
                  const Icon = cat.icon;
                  const isSelected = selectedCategory === cat.id;
                  const countStandalone =
                    cat.id === 'ALL'
                      ? questions.length
                      : questions.filter((q) => q.category === cat.id).length;
                  const countPassageQs =
                    cat.id === 'ALL'
                      ? passages.reduce((acc, p) => acc + p.questions.length, 0)
                      : passages
                          .filter((p) => p.category === cat.id)
                          .reduce((acc, p) => acc + p.questions.length, 0);
                  const totalCat = countStandalone + countPassageQs;

                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`w-full text-left px-3 py-2.5 rounded-xl border text-xs font-bold flex items-center justify-between transition cursor-pointer ${
                        isSelected
                          ? 'bg-indigo-600/25 border-indigo-400 text-white shadow-sm'
                          : 'bg-slate-950/60 border-slate-800/80 text-slate-300 hover:bg-slate-800/60'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <Icon className={`w-4 h-4 shrink-0 ${cat.color}`} />
                        <span className="truncate">{cat.name}</span>
                      </div>
                      <span className="px-2 py-0.5 rounded-full text-[10px] bg-slate-900 text-slate-300 border border-slate-700">
                        {totalCat}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Quick Motivation & Mastery Bento Box */}
              <div className="bg-gradient-to-br from-indigo-950/60 via-slate-900 to-emerald-950/40 border border-indigo-500/30 rounded-xl p-3.5 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider text-indigo-300">
                    Tiến Độ Chinh Phục HSG Tỉnh
                  </span>
                  <BarChart3 className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-slate-950/80 border border-slate-800 rounded-lg p-2">
                    <div className="text-base font-black text-emerald-400">{stats.correctCount}</div>
                    <div className="text-[10px] text-slate-400">Câu Đúng</div>
                  </div>
                  <div className="bg-slate-950/80 border border-slate-800 rounded-lg p-2">
                    <div className="text-base font-black text-rose-400">{stats.wrongCount}</div>
                    <div className="text-[10px] text-slate-400">Câu Sai</div>
                  </div>
                  <div className="bg-slate-950/80 border border-slate-800 rounded-lg p-2">
                    <div className="text-base font-black text-amber-400">{bookmarkedIds.length}</div>
                    <div className="text-[10px] text-slate-400">Đánh Dấu</div>
                  </div>
                </div>
                <button
                  onClick={() => setActiveTab('MOCK_EXAM')}
                  className="w-full py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black tracking-wide flex items-center justify-center gap-1.5 shadow-md transition cursor-pointer"
                >
                  <Award className="w-4 h-4" />
                  VÀO PHÒNG THI THỬ 180 PHÚT
                </button>
              </div>
            </aside>

            {/* Right Main Column: Dense Questions & Split-Screen Reading Passages */}
            <section className="lg:col-span-9 space-y-5">
              {/* Top Category Summary Banner */}
              <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-base md:text-lg font-black text-white flex items-center gap-2">
                    <span>
                      {CATEGORIES.find((c) => c.id === selectedCategory)?.name}
                    </span>
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                      {filteredStandalone.length} câu đơn • {filteredPassages.length} bài đọc/cloze
                    </span>
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Làm trực tiếp từng câu, nhận điểm XP và mở khóa giải thích chi tiết chuẩn đáp án HSG Tỉnh.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      const allVisibleIds = [
                        ...filteredStandalone.map((q) => q.id),
                        ...filteredPassages.flatMap((p) => p.questions.map((q) => q.id))
                      ];
                      const nextState = {};
                      allVisibleIds.forEach((id) => (nextState[id] = true));
                      setShowExplanation((prev) => ({ ...prev, ...nextState }));
                    }}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold text-amber-300 border border-slate-700 flex items-center gap-1.5 cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    Mở Toàn Bộ Giải Thích
                  </button>
                </div>
              </div>

              {/* PASSAGE-BASED EXERCISES (SPLIT-PANE VIEW FOR CLOZE, READING, PROOFREADING, WORD FORM PASSAGES) */}
              {filteredPassages.length > 0 && (
                <div className="space-y-6">
                  {filteredPassages.map((passage) => (
                    <div
                      key={passage.id}
                      className="bg-slate-900/70 border border-indigo-500/30 rounded-2xl overflow-hidden shadow-xl"
                    >
                      {/* Passage Header */}
                      <div className="bg-slate-900 border-b border-slate-800 px-4 py-3 flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 text-xs font-black rounded bg-indigo-600 text-white">
                            {passage.examId}
                          </span>
                          <span className="px-2.5 py-0.5 text-xs font-bold rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                            {passage.subType}
                          </span>
                          <h3 className="text-sm md:text-base font-black text-white">
                            {passage.title}
                          </h3>
                        </div>
                        <span className="text-xs text-slate-400 font-semibold">
                          {passage.questions.length} câu hỏi đi kèm
                        </span>
                      </div>

                      {/* Split-Screen 2 Columns: Left Sticky Passage, Right Interactive Questions */}
                      <div className="grid grid-cols-1 xl:grid-cols-12 divide-y xl:divide-y-0 xl:divide-x divide-slate-800">
                        {/* Left Column: Full Unabridged Reading Passage */}
                        <div className="xl:col-span-6 p-4 md:p-5 bg-slate-950/60 max-h-[680px] overflow-y-auto">
                          <div className="text-xs font-bold uppercase tracking-wider text-indigo-400 mb-2 flex items-center gap-1.5">
                            <FileText className="w-3.5 h-3.5" />
                            <span>Toàn Văn Bài Đọc / Đề Bài Gốc (Không Lược Bớt)</span>
                          </div>
                          <div className="text-xs md:text-sm text-slate-200 whitespace-pre-line leading-relaxed font-serif bg-slate-900/80 p-4 rounded-xl border border-slate-800">
                            {passage.content}
                          </div>
                        </div>

                        {/* Right Column: Interactive Questions for this Passage */}
                        <div className="xl:col-span-6 p-4 md:p-5 space-y-3 max-h-[680px] overflow-y-auto">
                          <div className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1 flex items-center gap-1.5">
                            <ListChecks className="w-3.5 h-3.5" />
                            <span>Làm Câu Hỏi Tương Ứng</span>
                          </div>
                          {passage.questions.map((q) => renderQuestionCard({ ...q, examId: passage.examId }, false))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* STANDALONE QUESTIONS GRID (GRAMMAR, PHRASAL VERBS, VOCAB, WORD FORM, TRANSFORMATION) */}
              {filteredStandalone.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {filteredStandalone.map((q) => renderQuestionCard(q, false))}
                </div>
              )}
            </section>
          </div>
        )}

        {/* ================================================================ */}
        {/* TAB 2: FULL MOCK EXAM SIMULATOR (ĐỀ 1, ĐỀ 2, ĐỀ 3 + ĐỀ UPLOAD) */}
        {/* ================================================================ */}
        {activeTab === 'MOCK_EXAM' && (
          <div className="space-y-4">
            {/* Exam Selector Header */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-black text-white flex items-center gap-2">
                    <Award className="w-5 h-5 text-amber-400" />
                    <span>PHÒNG THI THỬ HSG TIẾNG ANH CẤP TỈNH (CHUẨN 180 PHÚT)</span>
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Chọn Đề 1, Đề 2, Đề 3 hoặc bất kỳ đề nào bạn đã tải lên ở mục Upload để làm bài tổng hợp và chấm điểm tự động.
                  </p>
                </div>

                {/* Timer & Exam Control Buttons */}
                <div className="flex items-center gap-3">
                  <div className="px-4 py-2 rounded-xl bg-slate-950 border border-amber-500/40 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-amber-400" />
                    <span className="font-mono text-base font-black text-amber-300">
                      {formatTime(mockTimeLeft, true)}
                    </span>
                  </div>

                  {!mockStarted ? (
                    <button
                      onClick={() => {
                        setMockStarted(true);
                        setMockSubmitted(false);
                      }}
                      className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black flex items-center gap-2 shadow-lg shadow-emerald-600/25 cursor-pointer"
                    >
                      <Play className="w-4 h-4 fill-current" />
                      BẮT ĐẦU TÍNH GIỜ LÀM BÀI
                    </button>
                  ) : !mockSubmitted ? (
                    <button
                      onClick={() => setMockSubmitted(true)}
                      className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-black flex items-center gap-2 shadow-lg shadow-indigo-600/25 cursor-pointer"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      NỘP BÀI & CHẤM ĐIỂM NGAY
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setMockSubmitted(false);
                        setMockStarted(false);
                        setMockAnswers({});
                        setMockFlagged({});
                        setMockTimeLeft(180 * 60);
                      }}
                      className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-2 cursor-pointer"
                    >
                      <RotateCcw className="w-4 h-4" />
                      Làm Lại Đề Này
                    </button>
                  )}
                </div>
              </div>

              {/* Exam Selection Cards (Đề 1, Đề 2, Đề 3 + Custom Uploaded Exams) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
                {examsList.map((ex) => {
                  const isSelected = activeMockExamId === ex.id;
                  return (
                    <button
                      key={ex.id}
                      onClick={() => {
                        setActiveMockExamId(ex.id);
                        setMockSubmitted(false);
                      }}
                      className={`text-left p-3.5 rounded-xl border transition cursor-pointer ${
                        isSelected
                          ? 'bg-indigo-600/20 border-indigo-400 ring-1 ring-indigo-400/40'
                          : 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-black text-indigo-300 uppercase">
                          {ex.id} • {ex.duration} PHÚT
                        </span>
                        {isSelected && (
                          <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-emerald-500/20 text-emerald-300">
                            Đang Chọn
                          </span>
                        )}
                      </div>
                      <div className="text-sm font-black text-white">{ex.title}</div>
                      <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">{ex.subtitle}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Score Report Banner After Submitting */}
            {mockSubmitted && mockScoreReport && (
              <div className="bg-gradient-to-r from-emerald-950/80 via-slate-900 to-indigo-950/80 border border-emerald-500/50 rounded-2xl p-5 flex flex-wrap items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="text-xs font-black uppercase tracking-wider text-emerald-400">
                    KẾT QUẢ CHẤM ĐIỂM ĐỀ {activeMockExamId}
                  </div>
                  <h3 className="text-2xl font-black text-white">
                    Điểm Quy Đổi: {mockScoreReport.scaledScore} / 20.0 Điểm ({mockScoreReport.percentage}%)
                  </h3>
                  <p className="text-xs text-slate-300">
                    Số câu đúng: <strong className="text-emerald-400">{mockScoreReport.correct}</strong> / {mockScoreReport.total} câu • Toàn bộ đáp án và lời giải chi tiết đã được mở bên dưới!
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-center">
                    <div className="text-xs text-slate-400">Xếp Giải Dự Kiến</div>
                    <div className="text-base font-black text-amber-400">
                      {mockScoreReport.percentage >= 85
                        ? 'GIẢI NHẤT TỈNH'
                        : mockScoreReport.percentage >= 70
                        ? 'GIẢI NHÌ TỈNH'
                        : mockScoreReport.percentage >= 55
                        ? 'GIẢI BA TỈNH'
                        : 'CẦN ÔN THÊM'}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Main Mock Exam Workspace: Left Questions + Passages, Right Sticky Question Palette */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
              <div className="lg:col-span-9 space-y-5">
                {/* Standalone Questions of this Exam */}
                <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 space-y-3">
                  <h3 className="text-sm font-black uppercase tracking-wider text-indigo-300">
                    PHẦN I: LEXICO-GRAMMAR, WORD FORMATION & SENTENCE TRANSFORMATION ({mockExamData.standalone.length} CÂU)
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {mockExamData.standalone.map((q) => renderQuestionCard(q, true))}
                  </div>
                </div>

                {/* Full Reading & Cloze Passages of this Exam */}
                {mockExamData.examPassages.map((passage) => (
                  <div
                    key={passage.id}
                    className="bg-slate-900/70 border border-slate-800 rounded-2xl overflow-hidden"
                  >
                    <div className="bg-slate-900 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
                      <h3 className="text-sm font-black text-white">{passage.title}</h3>
                      <span className="text-xs text-indigo-300 font-bold">{passage.subType}</span>
                    </div>
                    <div className="grid grid-cols-1 xl:grid-cols-12 divide-y xl:divide-y-0 xl:divide-x divide-slate-800">
                      <div className="xl:col-span-6 p-4 bg-slate-950/60 max-h-[600px] overflow-y-auto">
                        <div className="text-xs md:text-sm text-slate-200 whitespace-pre-line leading-relaxed font-serif">
                          {passage.content}
                        </div>
                      </div>
                      <div className="xl:col-span-6 p-4 space-y-3 max-h-[600px] overflow-y-auto">
                        {passage.questions.map((q) => renderQuestionCard({ ...q, examId: activeMockExamId }, true))}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Essay Writing Section (Especially for Đề 2 Part 5: 350-word Essay) */}
                <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-black uppercase tracking-wider text-amber-400">
                      PHẦN TỰ LUẬN: ESSAY WRITING (350 WORDS - ĐỀ 2 SECTION FOUR PART 5)
                    </h3>
                    <span className="text-xs font-mono text-slate-400">
                      Số từ: {essayText.trim() ? essayText.trim().split(/\s+/).length : 0} / 350 words
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <strong>Topic:</strong> People learn in different ways. Some people learn by doing things; other people learn by reading about things; others learn by listening to people talk about things. Which of these methods of learning is best for you? Use specific examples to support your choice.
                  </p>
                  <textarea
                    rows={6}
                    value={essayText}
                    onChange={(e) => setEssayText(e.target.value)}
                    placeholder="Viết bài luận 350 từ của bạn tại đây..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-slate-100 focus:border-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Right Sticky Question Palette Navigator */}
              <aside className="lg:col-span-3">
                <div className="sticky top-28 bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase tracking-wider text-slate-300">
                      Bảng Điều Hướng Câu Hỏi
                    </span>
                    <span className="text-xs text-indigo-400 font-bold">
                      {Object.keys(mockAnswers).length}/{mockExamData.allQs.length} Đã làm
                    </span>
                  </div>

                  <div className="grid grid-cols-5 gap-1.5 max-h-[380px] overflow-y-auto p-1">
                    {mockExamData.allQs.map((q, idx) => {
                      const answered = Boolean(mockAnswers[q.id]?.trim());
                      const flagged = mockFlagged[q.id];
                      const isCorrect = mockSubmitted && verifyAnswer(q, mockAnswers[q.id]);

                      return (
                        <a
                          key={q.id}
                          href={`#q-card-${q.id}`}
                          className={`h-8 rounded-lg text-xs font-bold flex items-center justify-center border transition ${
                            mockSubmitted
                              ? isCorrect
                                ? 'bg-emerald-500/30 border-emerald-400 text-emerald-200'
                                : 'bg-rose-500/30 border-rose-400 text-rose-200'
                              : flagged
                              ? 'bg-amber-500/30 border-amber-400 text-amber-200'
                              : answered
                              ? 'bg-indigo-600 text-white border-indigo-400'
                              : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-600'
                          }`}
                        >
                          {idx + 1}
                        </a>
                      );
                    })}
                  </div>

                  <div className="pt-2 border-t border-slate-800 grid grid-cols-2 gap-2 text-[11px] text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded bg-indigo-600 inline-block" /> Đã trả lời
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded bg-amber-500 inline-block" /> Đánh dấu xem lại
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        )}

        {/* ================================================================ */}
        {/* TAB 3: AI SMART EXAM UPLOADER & AUTO-GENERATOR (Y CHANG ĐỀ 1, 2, 3) */}
        {/* ================================================================ */}
        {activeTab === 'UPLOADER' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Left Column: File Dropzone + Raw Exam Paste + 1-Click Demo */}
            <div className="lg:col-span-7 space-y-4">
              <div className="bg-slate-900 border border-indigo-500/40 rounded-2xl p-5 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <span className="px-2.5 py-0.5 text-[10px] font-black uppercase rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                      AI AUTO-PARSER ENGINE
                    </span>
                    <h2 className="text-lg font-black text-white mt-1">
                      UPLOAD FILE ĐỀ KHÁC & TỰ TẠO BÀI TẬP Y HỆT ĐỀ 1, 2, 3
                    </h2>
                    <p className="text-xs text-slate-400">
                      Tải file đề (.txt, .md, .json) hoặc dán nội dung từ Word/PDF. Hệ thống tự động bóc tách Bài Đọc (Reading), Cloze, Trắc nghiệm A/B/C/D, Word Form và Rewrite để đưa vào cả 8 Chuyên đề lẫn Phòng Thi Thử!
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setRawUploadText(SAMPLE_DE4_RAW_TEXT);
                      setNewExamTitle('ĐỀ THI CHỌN HSG CẤP TỈNH - ĐỀ SỐ 4');
                      setNewExamCode('DE4');
                      runSmartParser(SAMPLE_DE4_RAW_TEXT);
                    }}
                    className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 text-xs font-black flex items-center gap-1.5 shadow-lg cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4 fill-current" />
                    Nạp Thử "Đề Mẫu Số 4" Chỉ 1 Click
                  </button>
                </div>

                {uploadSuccessBanner && (
                  <div className="p-3.5 rounded-xl bg-emerald-950/80 border border-emerald-400 text-emerald-200 text-xs font-bold flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{uploadSuccessBanner}</span>
                    </div>
                    <button
                      onClick={() => setActiveTab('MOCK_EXAM')}
                      className="px-2.5 py-1 rounded bg-emerald-500 text-slate-950 font-black shrink-0"
                    >
                      Thi Ngay
                    </button>
                  </div>
                )}

                {/* Exam Metadata Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2">
                    <label className="text-xs font-bold text-slate-300 block mb-1">
                      Tên Đề Thi Mới
                    </label>
                    <input
                      type="text"
                      value={newExamTitle}
                      onChange={(e) => setNewExamTitle(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1">
                      Mã Đề (Tag)
                    </label>
                    <input
                      type="text"
                      value={newExamCode}
                      onChange={(e) => setNewExamCode(e.target.value.toUpperCase())}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs font-mono font-bold text-indigo-300"
                    />
                  </div>
                </div>

                {/* Drag & Drop File Upload Box */}
                <label className="block border-2 border-dashed border-slate-700 hover:border-indigo-400 rounded-2xl p-4 text-center cursor-pointer bg-slate-950/50 transition">
                  <input
                    type="file"
                    accept=".txt,.md,.json,.csv"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <Upload className="w-7 h-7 text-indigo-400 mx-auto mb-1.5" />
                  <div className="text-xs font-bold text-slate-200">
                    Kéo thả hoặc nhấn để chọn file Đề Thi (.txt, .md, .json)
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    Hoặc copy toàn bộ văn bản từ file PDF / Word của bạn và dán trực tiếp vào ô bên dưới
                  </div>
                </label>

                {/* Raw Exam Textarea */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-bold text-slate-300">
                      Nội Dung Đề Thi (Hỗ trợ đầy đủ Bài Đọc PASSAGE...END_PASSAGE, Câu hỏi 1. A. B. C. D., ANSWER:, EXPLANATION:)
                    </label>
                    <button
                      onClick={() => setRawUploadText('')}
                      className="text-[11px] text-slate-400 hover:text-rose-400"
                    >
                      Xóa trắng
                    </button>
                  </div>
                  <textarea
                    rows={12}
                    value={rawUploadText}
                    onChange={(e) => setRawUploadText(e.target.value)}
                    placeholder={`Dán nội dung đề thi vào đây... Ví dụ:\nI. GRAMMAR\n1. The doctor insisted that his patient ________.\nA. take it easy\nB. takes it easy\nC. to take\nD. taking\nANSWER: A\n\nPASSAGE:\n[Dán toàn bộ bài đọc dài vào đây]\nEND_PASSAGE`}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs font-mono text-slate-200 focus:border-indigo-500 focus:outline-none"
                  />
                </div>

                <button
                  onClick={() => runSmartParser(rawUploadText)}
                  className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 cursor-pointer"
                >
                  <Brain className="w-4 h-4" />
                  PHÂN TÍCH & BÓC TÁCH ĐỀ TỰ ĐỘNG NGAY
                </button>
              </div>
            </div>

            {/* Right Column: Live Extraction Preview & Instant Import */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
                <h3 className="text-sm font-black uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  <span>XEM TRƯỚC CẤU TRÚC ĐỀ ĐƯỢC TẠO TỰ ĐỘNG</span>
                </h3>

                {!parsePreview ? (
                  <div className="p-8 text-center border border-slate-800 rounded-xl bg-slate-950/60 space-y-2">
                    <FileText className="w-8 h-8 text-slate-600 mx-auto" />
                    <p className="text-xs text-slate-400">
                      Hãy nhấn nút <strong>"Nạp Thử Đề Mẫu Số 4"</strong> hoặc dán đề của bạn rồi bấm <strong>"Phân Tích & Bóc Tách Đề Tự Động"</strong> để xem kết quả.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="p-3.5 rounded-xl bg-indigo-950/40 border border-indigo-500/40 space-y-1">
                      <div className="text-xs font-black text-indigo-300">{parsePreview.examId}</div>
                      <div className="text-sm font-black text-white">{parsePreview.title}</div>
                      <div className="text-xs text-emerald-300 font-semibold">
                        Đã bóc tách: {parsePreview.standaloneCount} câu hỏi đơn + {parsePreview.passagesCount} bài đọc đầy đủ!
                      </div>
                    </div>

                    {/* Preview Extracted Passages */}
                    {parsePreview.passages.map((p) => (
                      <div key={p.id} className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                        <div className="text-xs font-bold text-cyan-300">
                          [BÀI ĐỌC TRÍCH XUẤT] {p.title} ({p.questions.length} câu hỏi)
                        </div>
                        <p className="text-[11px] text-slate-400 line-clamp-3 font-serif">
                          {p.content}
                        </p>
                      </div>
                    ))}

                    {/* Preview Extracted Questions */}
                    <div className="space-y-2 max-h-[340px] overflow-y-auto pr-1">
                      {parsePreview.standalone.map((q) => (
                        <div key={q.id} className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1">
                          <div className="flex justify-between">
                            <span className="font-bold text-indigo-400">{q.category}</span>
                            <span className="font-mono text-emerald-400">Key: {q.answer}</span>
                          </div>
                          <p className="text-slate-200 font-medium">{q.prompt}</p>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={confirmImportExam}
                      className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      LƯU VÀO KHO CHUYÊN ĐỀ & TẠO PHÒNG THI ({parsePreview.examId})
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ================================================================ */}
        {/* TAB 4: VIP C1/C2 FLASHCARDS & MISTAKE NOTEBOOK */}
        {/* ================================================================ */}
        {activeTab === 'FLASHCARDS' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Left Column: Interactive 3D Flip Flashcards */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
                      ACTIVE RECALL
                    </span>
                    <h2 className="text-base font-black text-white mt-1">
                      FLASHCARDS IDIOMS & COLLOCATIONS ĐỀ 1, 2, 3
                    </h2>
                  </div>
                  <span className="text-xs font-mono text-slate-400">
                    {activeCardIndex + 1} / {VIP_FLASHCARDS.length}
                  </span>
                </div>

                {/* Flashcard Box */}
                <div
                  onClick={() => setCardFlipped(!cardFlipped)}
                  className="min-h-[230px] rounded-2xl border border-indigo-500/40 bg-gradient-to-br from-slate-950 via-indigo-950/40 to-slate-950 p-6 flex flex-col justify-between cursor-pointer select-none hover:border-indigo-400 transition-all shadow-xl"
                >
                  <div className="flex items-center justify-between text-xs text-indigo-300 font-bold">
                    <span>{VIP_FLASHCARDS[activeCardIndex].type}</span>
                    <span className="text-[11px] text-slate-400">Nhấn để lật thẻ</span>
                  </div>

                  {!cardFlipped ? (
                    <div className="my-auto text-center space-y-2">
                      <div className="text-xl md:text-2xl font-black text-white tracking-tight">
                        {VIP_FLASHCARDS[activeCardIndex].term}
                      </div>
                      <p className="text-xs text-slate-400 italic">
                        "{VIP_FLASHCARDS[activeCardIndex].example}"
                      </p>
                    </div>
                  ) : (
                    <div className="my-auto text-center space-y-2">
                      <div className="text-lg font-black text-emerald-300">
                        {VIP_FLASHCARDS[activeCardIndex].meaning}
                      </div>
                      <p className="text-xs text-slate-300">
                        Ví dụ chuẩn trong đề: "{VIP_FLASHCARDS[activeCardIndex].example}"
                      </p>
                    </div>
                  )}

                  <div className="text-center text-[11px] text-slate-500">
                    {cardFlipped ? 'Đang hiện nghĩa Tiếng Việt' : 'Đang hiện thuật ngữ Tiếng Anh'}
                  </div>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-between gap-2">
                  <button
                    onClick={() => {
                      setCardFlipped(false);
                      setActiveCardIndex((prev) => (prev === 0 ? VIP_FLASHCARDS.length - 1 : prev - 1));
                    }}
                    className="flex-1 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" /> Thẻ Trước
                  </button>
                  <button
                    onClick={() => setCardFlipped(!cardFlipped)}
                    className="px-4 py-2 rounded-xl bg-indigo-600/30 border border-indigo-400 text-indigo-200 text-xs font-bold cursor-pointer"
                  >
                    Lật Thẻ
                  </button>
                  <button
                    onClick={() => {
                      setCardFlipped(false);
                      setActiveCardIndex((prev) => (prev + 1) % VIP_FLASHCARDS.length);
                    }}
                    className="flex-1 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold flex items-center justify-center gap-1 cursor-pointer"
                  >
                    Thẻ Tiếp <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Mistake & Bookmarked Questions Bank */}
            <div className="lg:col-span-7 space-y-4">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-base font-black text-white flex items-center gap-2">
                      <Bookmark className="w-4 h-4 text-amber-400 fill-amber-400" />
                      <span>SỔ TAY CÂU SAI & CÂU KHÓ ĐÃ LƯU ({mistakeQuestions.length})</span>
                    </h2>
                    <p className="text-xs text-slate-400">
                      Mọi câu bạn làm sai hoặc bấm biểu tượng Bookmark đều tự động tập hợp tại đây để cày lại trước ngày thi.
                    </p>
                  </div>
                </div>

                {mistakeQuestions.length === 0 ? (
                  <div className="p-8 text-center text-xs text-slate-400 bg-slate-950 rounded-xl border border-slate-800">
                    Chưa có câu sai hoặc câu đánh dấu nào. Hãy luyện tập ở Tab 1!
                  </div>
                ) : (
                  <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
                    {mistakeQuestions.map((q) => renderQuestionCard(q, false))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}