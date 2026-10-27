const zh = {
  title: "图片背景更换工具",
  brand: "证件照工坊",
  nav_home: "首页",
  nav_specs: "证件照规格",
  nav_guide: "拍摄指南",
  nav_batch: "批量换底",
  nav_faq: "常见问题",
  subtitle: "采用开源AI模型 · 无需上传服务器 · 隐私安全 · 永久免费",

  upload_drag: "拖拽图片到此处，或点击选择图片",
  upload_hint: "支持 JPG / PNG / WebP，建议不超过 4MB",
  btn_remove_bg: "AI 去除背景",
  btn_manual_pick: "手动取色去除",
  btn_reset: "重置",
  btn_reupload: "换图",
  btn_download: "下载结果",
  overlay_processing: "正在处理...",
  overlay_loading_model: "正在加载 AI 模型 ({0})，首次使用需下载...",
  overlay_inferring: "正在推理抠图...",
  overlay_done: "处理完成，正在渲染...",
  alert_remove_fail: "背景去除失败，请重试或换一张图片。\n{0}",

  panel_bg_settings: "背景设置",
  bg_transparent: "透明背景",
  bg_color: "纯色背景",
  bg_gradient: "渐变背景",
  bg_image: "图片背景",
  label_bg_color: "背景颜色",
  label_grad_start: "起始颜色",
  label_grad_end: "结束颜色",
  label_grad_dir: "渐变方向",
  grad_to_bottom: "从上到下",
  grad_to_right: "从左到右",
  grad_to_br: "左上到右下",
  grad_to_bl: "右上到左下",
  grad_circle: "径向渐变",
  label_select_bg_img: "选择背景图片",
  btn_select_img: "选择图片",

  panel_manual_settings: "手动取色设置",
  label_tolerance: "容差: {0}",
  label_feather: "边缘羽化: {0}",
  hint_click_bg: "点击图片上要去除的背景颜色区域",
  picked_color: "已选颜色：",

  panel_download_size: "下载尺寸",
  size_original: "原大小",
  size_original_desc: "保持原始尺寸",
  size_1inch: "1寸",
  size_1inch_desc: "295 × 413 px",
  size_2inch: "2寸",
  size_2inch_desc: "413 × 579 px",
  size_big1inch: "大1寸",
  size_big1inch_desc: "390 × 567 px",
  size_small2inch: "小2寸",
  size_small2inch_desc: "413 × 526 px",

  panel_preview: "预览",
  tab_result: "结果",
  tab_original: "原图",
  tab_compare: "对比",
  checkerboard_hint: "棋盘格 = 透明区域",

  specs_title: "证件照规格一览",
  specs_desc: "不同场景对证件照的尺寸、背景色、分辨率要求各不相同，以下是常见规格汇总。",
  specs_id_category: "身份证 / 护照类",
  specs_edu_category: "学历 / 考试类",
  specs_work_category: "职场 / 资格类",
  specs_drive_category: "驾照 / 车辆类",
  specs_th_type: "类型",
  specs_th_size_mm: "尺寸 (mm)",
  specs_th_size_px: "像素 (px)",
  specs_th_bg: "背景色",
  specs_th_dpi: "分辨率",
  specs_tip: '<strong><i data-lucide="lightbulb"></i> 提示：</strong>以上规格仅供参考，具体要求请以办证机构官方通知为准。使用本工具制作证件照时，可在右侧"下载尺寸"面板中选择对应规格，一键导出。',

  guide_title: "证件照拍摄指南",
  guide_desc: "一张合格的证件照，拍摄环节至关重要。以下是从准备到拍摄的完整攻略。",
  guide_light: "光线",
  guide_posture: "姿态",
  guide_expression: "表情",
  guide_dress: "着装",
  guide_hairstyle: "发型",
  guide_accessory: "配饰",
  guide_phone_tips: "手机拍摄技巧",
  guide_bg_require: "背景要求",
  guide_flow: "完整流程",

  batch_title: "批量换底",
  batch_desc: "一次性为多张证件照统一更换背景色，省时省力。",
  batch_drag: "拖拽多张图片到此处，或点击选择图片",
  batch_hint: "支持同时选择多张 JPG / PNG 图片",
  batch_cut_mode: "抠图方式",
  batch_ai_label: "AI 智能抠图",
  batch_ai_desc: "自动识别前景人物并去除背景，适合各类证件照",
  batch_target_bg: "目标背景色",
  batch_color_white: "白色",
  batch_color_id_blue: "证件蓝",
  batch_color_light_blue: "浅蓝",
  batch_color_dark_blue: "深蓝",
  batch_color_red: "红色",
  batch_color_dark_red: "暗红",
  batch_color_beige: "米色",
  batch_color_light_gray: "浅灰",
  batch_color_black: "黑色",
  batch_color_transparent: "透明",
  batch_custom_color: "自定义颜色：",
  batch_output_size: "输出尺寸",
  batch_btn_process: "开始批量处理",
  batch_btn_download: "打包下载全部",
  batch_btn_clear: "清空列表",
  batch_progress_text: "处理中... 0/0",
  batch_tip: '<strong><i data-lucide="lightbulb"></i> 说明：</strong>批量处理使用 AI 自动去除背景，每张图片处理约需 2~5 秒。所有操作均在浏览器本地完成，图片不会上传到服务器。',

  batch_status_pending: "等待处理",
  batch_status_processing: "处理中...",
  batch_status_done: "已完成",
  batch_status_error: "失败",
  batch_ai_cutting: "AI 抠图 {0}/{1}...",
  batch_model_loading: "正在加载 AI 模型 ({0})，首次需下载...",
  batch_model_load_fail: "AI 模型加载失败: {0}",
  batch_process_complete: "处理完成！成功 {0}/{1}",
  batch_packing: "正在打包...",
  batch_pack_fail: "打包下载失败: {0}",

  faq_title: "常见问题",
  faq_desc: "关于证件照制作和本工具的常见疑问解答。",

  footer: '基于 <a href="https://github.com/planby-technologies/rmbg-webgpu" target="_blank">@planby-tech/rmbg-webgpu</a> (MIT + Apache-2.0) · 所有处理均在浏览器本地完成',

  compare_original: "原图",
  compare_result: "结果",

  model_birefnet: "BiRefNet-Lite 512 FP32 (~183MB)",
  model_u2netp: "U2NetP 快速 (~4MB)",
  model_birefnet_short: "BiRefNet-Lite (~183MB)",
  model_u2netp_short: "U2NetP (~4MB)",

  size_label_original: "原大小",
  size_label_1inch: "1寸",
  size_label_2inch: "2寸",
  size_label_big1inch: "大1寸",
  size_label_small2inch: "小2寸",

  batch_folder_name: "证件照批量结果",

  specs_id_1: "居民身份证",
  specs_id_2: "中国护照",
  specs_id_3: "签证照（通用）",
  specs_id_4: "港澳通行证",
  specs_edu_1: "1寸标准",
  specs_edu_2: "2寸标准",
  specs_edu_3: "小1寸",
  specs_edu_4: "小2寸",
  specs_edu_5: "大1寸",
  specs_edu_6: "考研报名",
  specs_edu_7: "四六级考试",
  specs_edu_8: "学信网头像",
  specs_work_1: "简历照片",
  specs_work_2: "教师资格认定",
  specs_work_3: "会计初级",
  specs_work_4: "一级建造师",
  specs_work_5: "执业医师",
  specs_work_6: "社保卡",
  specs_drive_1: "驾驶证",
  specs_drive_2: "行驶证",
  specs_color_white: "白色",
  specs_color_blue: "蓝色",
  specs_color_rbw: "红/蓝/白",
  specs_color_bw: "蓝/白",

  guide_light_1: "使用<strong>均匀柔和的自然光</strong>或柔光灯，避免直射阳光",
  guide_light_2: "面部左右光线对称，避免一侧阴影",
  guide_light_3: "推荐<strong>正面顺光</strong>，不要侧光或逆光",
  guide_light_4: "如用手机闪光灯，保持 1.5m 以上距离，避免过曝",
  guide_posture_1: "头部居中，<strong>两耳可见</strong>，不偏不歪",
  guide_posture_2: "双肩水平，身体正对镜头",
  guide_posture_3: "下巴微收，避免仰头或低头",
  guide_posture_4: "双目<strong>正视镜头</strong>，自然睁大",
  guide_expr_1: "表情自然，<strong>嘴唇闭合</strong>，不露齿",
  guide_expr_2: "可微笑但不要夸张",
  guide_expr_3: "眼睛自然睁开，不眯眼",
  guide_expr_4: "部分证件要求<strong>不笑</strong>（如护照），请提前确认",
  guide_dress_1: "穿<strong>深色有领</strong>服装，与背景形成对比",
  guide_dress_2: "白色背景 → 不穿白色/浅色上衣",
  guide_dress_3: "蓝色背景 → 不穿蓝色上衣",
  guide_dress_4: "避免吊带、背心、低胸装",
  guide_dress_5: "制服类证件照需穿对应制服",
  guide_hair_1: "头发不遮住眉毛、耳朵",
  guide_hair_2: "长发建议扎起或置于肩后",
  guide_hair_3: "刘海不能遮住眉毛",
  guide_hair_4: "避免过于蓬松的发型",
  guide_acc_1: "一般<strong>禁止佩戴帽子</strong>",
  guide_acc_2: "眼镜：部分证件允许，但镜片<strong>不能反光</strong>",
  guide_acc_3: "不得佩戴有色眼镜、墨镜",
  guide_acc_4: "耳饰、项链等建议取下",
  guide_acc_5: "宗教头饰需特殊申请",
  guide_phone_1: "使用<strong>后置摄像头</strong>，画质更佳",
  guide_phone_2: "距离 1~1.5m，使用<strong>2x 变焦</strong>减少畸变",
  guide_phone_3: "请他人帮忙拍摄，避免自拍畸变",
  guide_phone_4: "开启网格线辅助居中对齐",
  guide_phone_5: "使用三脚架保持稳定",
  guide_bg_1: "背景<strong>纯色、无杂物</strong>",
  guide_bg_2: "常见：白色、蓝色(#438EDB)、红色(#FF0000)",
  guide_bg_3: "如背景不纯，可用本工具 AI 去除后替换",
  guide_bg_4: "拍摄时尽量靠墙，减少阴影",
  guide_flow_1: "确认证件照规格要求（尺寸、底色）",
  guide_flow_2: "按指南拍摄原始照片",
  guide_flow_3: "上传到本工具，AI 去除背景",
  guide_flow_4: "选择目标背景色",
  guide_flow_5: "选择输出尺寸规格",
  guide_flow_6: "下载成品证件照",

  batch_size_1inch: "1寸 (295×413)",
  batch_size_2inch: "2寸 (413×579)",
  batch_size_big1inch: "大1寸 (390×567)",
  batch_size_small2inch: "小2寸 (413×526)",

  faq_q1: "证件照的背景色有哪些要求？",
  faq_a1_title: "常见背景色要求：",
  faq_a1_1: "<strong>白色</strong>：身份证、护照、驾照、社保卡等大多数证件",
  faq_a1_2: "<strong>蓝色</strong>（约 #438EDB）：毕业证、学位证、四六级、部分资格考试",
  faq_a1_3: "<strong>红色</strong>（约 #FF0000）：部分结婚证、保险、工会等",
  faq_a1_end: "具体要求请以办证机构通知为准。",
  faq_q2: "AI 抠图和手动取色有什么区别？",
  faq_a2_1: "<strong>AI 去除背景</strong>：使用深度学习模型自动识别前景人物，适合背景复杂、颜色不纯的照片。效果更好但处理稍慢。",
  faq_a2_2: "<strong>手动取色去除</strong>：点击图片上的背景色，基于颜色容差去除。适合背景颜色单一、与人物颜色差异明显的照片。速度更快。",
  faq_a2_3: "建议优先使用 AI 模式，如对结果不满意可重置后尝试手动模式。",
  faq_q3: "处理后的证件照能直接使用吗？",
  faq_a3_1: "本工具生成的证件照<strong>仅供参考和日常使用</strong>。对于正式证件（身份证、护照等），建议前往专业照相馆拍摄，因为：",
  faq_a3_2: "部分证件对头部比例、眼睛位置有严格要求",
  faq_a3_3: "线上提交可能需要特定格式或电子检测",
  faq_a3_4: "打印质量与分辨率、色彩空间相关",
  faq_a3_5: "对于简历、工牌、考试报名等非正式场景，本工具完全够用。",
  faq_q4: "为什么 AI 模型加载很慢？",
  faq_a4_1: "首次使用时，AI 模型需要从网络下载到浏览器缓存：",
  faq_a4_2: "<strong>ai模型</strong>（高质量模式）：约 183MB，首次加载较慢，会缓存到浏览器，关闭浏览器会自动清除释放",
  faq_a4_3: "模型下载后会缓存在浏览器中，后续使用无需重复下载。如网络较慢，建议耐心等待模型加载完成。",
  faq_q5: "我的照片安全吗？会上传到服务器吗？",
  faq_a5_1: "<strong>完全安全！</strong>本工具所有处理均在浏览器本地完成：",
  faq_a5_2: "图片不会上传到任何服务器",
  faq_a5_3: "AI 模型在本地 WebGPU 推理",
  faq_a5_4: "处理结果仅保存在您的浏览器内存中",
  faq_a5_5: "关闭页面后所有数据自动清除",
  faq_q6: "支持哪些图片格式？",
  faq_a6_1: "支持上传 <strong>JPG / PNG / WebP</strong> 格式图片，建议文件不超过 4MB。",
  faq_a6_2: "输出格式为 <strong>PNG</strong>（支持透明背景），如需 JPEG 格式可在下载后自行转换。",
  faq_q7: "为什么抠图效果不理想？",
  faq_a7_1: "可能的原因和改善建议：",
  faq_a7_2: "<strong>背景与人物颜色相近</strong>：AI 可能误判，建议换用纯色背景重拍",
  faq_a7_3: "<strong>头发边缘有残影</strong>：这是 AI 模型的固有局限，可尝试切换高质量模型",
  faq_a7_4: "<strong>图片分辨率过低</strong>：建议使用 500px 以上的图片",
  faq_a7_5: "<strong>多人/复杂场景</strong>：本工具针对单人证件照优化，复杂场景效果有限",
  faq_q8: "批量处理最多支持多少张？",
  faq_a8_1: "理论上没有硬性限制，但建议单次不超过 <strong>20 张</strong>，原因：",
  faq_a8_2: "每张图片处理需要占用 GPU 和内存资源",
  faq_a8_3: "过多图片可能导致浏览器内存不足",
  faq_a8_4: "处理时间与图片数量成正比",
  faq_a8_5: "如需处理更多，可分批进行。",
  faq_q9: "联系我们？",
  faq_a9_1: "如您有任何问题或建议，欢迎联系我:jsj999jcy@gmail.com",
  faq_a9_2: "功能痛点，使用的bug,欢迎邮件联系我",
  faq_a9_3: "项目为爱发电，部署在超级小鸡上，如果无法访问，请联系我续费服务器或域名",
  faq_a9_4: "免费使用，项目为非商业项目，不提供商业支持，切勿滥用",
  faq_a9_5: "项目使用的依赖为免费开源的，协议为Apache-2.0协议或MIT协议",
};

const en = {
  title: "Photo Background Changer",
  brand: "ID Photo Studio",
  nav_home: "Home",
  nav_specs: "ID Specs",
  nav_guide: "Shooting Guide",
  nav_batch: "Batch Change",
  nav_faq: "FAQ",
  subtitle: "Open-source AI Model · No Server Upload · Privacy Safe · Free Forever",

  upload_drag: "Drag & drop image here, or click to select",
  upload_hint: "Supports JPG / PNG / WebP, recommended under 4MB",
  btn_remove_bg: "AI Remove BG",
  btn_manual_pick: "Manual Color Pick",
  btn_reset: "Reset",
  btn_reupload: "Change Image",
  btn_download: "Download",
  overlay_processing: "Processing...",
  overlay_loading_model: "Loading AI model ({0}), first time requires download...",
  overlay_inferring: "Inferring segmentation...",
  overlay_done: "Done, rendering...",
  alert_remove_fail: "Background removal failed, please try again or use a different image.\n{0}",

  panel_bg_settings: "Background Settings",
  bg_transparent: "Transparent",
  bg_color: "Solid Color",
  bg_gradient: "Gradient",
  bg_image: "Image Background",
  label_bg_color: "Background Color",
  label_grad_start: "Start Color",
  label_grad_end: "End Color",
  label_grad_dir: "Gradient Direction",
  grad_to_bottom: "Top to Bottom",
  grad_to_right: "Left to Right",
  grad_to_br: "Top-Left to Bottom-Right",
  grad_to_bl: "Top-Right to Bottom-Left",
  grad_circle: "Radial",
  label_select_bg_img: "Select Background Image",
  btn_select_img: "Select Image",

  panel_manual_settings: "Manual Pick Settings",
  label_tolerance: "Tolerance: {0}",
  label_feather: "Edge Feather: {0}",
  hint_click_bg: "Click on the background color area to remove",
  picked_color: "Selected color:",

  panel_download_size: "Download Size",
  size_original: "Original",
  size_original_desc: "Keep original size",
  size_1inch: "1-inch",
  size_1inch_desc: "295 × 413 px",
  size_2inch: "2-inch",
  size_2inch_desc: "413 × 579 px",
  size_big1inch: "Large 1-inch",
  size_big1inch_desc: "390 × 567 px",
  size_small2inch: "Small 2-inch",
  size_small2inch_desc: "413 × 526 px",

  panel_preview: "Preview",
  tab_result: "Result",
  tab_original: "Original",
  tab_compare: "Compare",
  checkerboard_hint: "Checkerboard = Transparent area",

  specs_title: "ID Photo Specifications",
  specs_desc: "Different scenarios have different requirements for ID photo size, background color, and resolution. Below is a summary of common specifications.",
  specs_id_category: "ID Card / Passport",
  specs_edu_category: "Education / Exam",
  specs_work_category: "Career / Certification",
  specs_drive_category: "Driver's License / Vehicle",
  specs_th_type: "Type",
  specs_th_size_mm: "Size (mm)",
  specs_th_size_px: "Pixels (px)",
  specs_th_bg: "Background",
  specs_th_dpi: "Resolution",
  specs_tip: '<strong><i data-lucide="lightbulb"></i> Tip:</strong> The above specifications are for reference only. Please refer to the official notice of the issuing authority for specific requirements. When using this tool, you can select the corresponding specification in the "Download Size" panel on the right to export with one click.',

  guide_title: "ID Photo Shooting Guide",
  guide_desc: "The shooting stage is crucial for a qualified ID photo. Here is a complete guide from preparation to shooting.",
  guide_light: "Lighting",
  guide_posture: "Posture",
  guide_expression: "Expression",
  guide_dress: "Dress Code",
  guide_hairstyle: "Hairstyle",
  guide_accessory: "Accessories",
  guide_phone_tips: "Phone Shooting Tips",
  guide_bg_require: "Background Requirements",
  guide_flow: "Complete Workflow",

  batch_title: "Batch Background Change",
  batch_desc: "Change the background color for multiple ID photos at once, saving time and effort.",
  batch_drag: "Drag & drop multiple images here, or click to select",
  batch_hint: "Supports selecting multiple JPG / PNG images simultaneously",
  batch_cut_mode: "Cutout Method",
  batch_ai_label: "AI Smart Cutout",
  batch_ai_desc: "Automatically identify foreground subjects and remove background, suitable for all types of ID photos",
  batch_target_bg: "Target Background Color",
  batch_color_white: "White",
  batch_color_id_blue: "ID Blue",
  batch_color_light_blue: "Light Blue",
  batch_color_dark_blue: "Dark Blue",
  batch_color_red: "Red",
  batch_color_dark_red: "Dark Red",
  batch_color_beige: "Beige",
  batch_color_light_gray: "Light Gray",
  batch_color_black: "Black",
  batch_color_transparent: "Transparent",
  batch_custom_color: "Custom color:",
  batch_output_size: "Output Size",
  batch_btn_process: "Start Batch Processing",
  batch_btn_download: "Download All (ZIP)",
  batch_btn_clear: "Clear List",
  batch_progress_text: "Processing... 0/0",
  batch_tip: '<strong><i data-lucide="lightbulb"></i> Note:</strong> Batch processing uses AI to automatically remove backgrounds. Each image takes about 2~5 seconds. All processing is done locally in the browser. Images are not uploaded to any server.',

  batch_status_pending: "Pending",
  batch_status_processing: "Processing...",
  batch_status_done: "Done",
  batch_status_error: "Error",
  batch_ai_cutting: "AI cutout {0}/{1}...",
  batch_model_loading: "Loading AI model ({0}), first time requires download...",
  batch_model_load_fail: "AI model loading failed: {0}",
  batch_process_complete: "Processing complete! Success {0}/{1}",
  batch_packing: "Packing...",
  batch_pack_fail: "Pack download failed: {0}",

  faq_title: "FAQ",
  faq_desc: "Frequently asked questions about ID photo creation and this tool.",

  footer: 'Based on <a href="https://github.com/planby-technologies/rmbg-webgpu" target="_blank">@planby-tech/rmbg-webgpu</a> (MIT + Apache-2.0) · All processing is done locally in the browser',

  compare_original: "Original",
  compare_result: "Result",

  model_birefnet: "BiRefNet-Lite 512 FP32 (~183MB)",
  model_u2netp: "U2NetP Fast (~4MB)",
  model_birefnet_short: "BiRefNet-Lite (~183MB)",
  model_u2netp_short: "U2NetP (~4MB)",

  size_label_original: "Original",
  size_label_1inch: "1-inch",
  size_label_2inch: "2-inch",
  size_label_big1inch: "Large 1-inch",
  size_label_small2inch: "Small 2-inch",

  batch_folder_name: "ID Photo Batch Results",

  specs_id_1: "Resident ID Card",
  specs_id_2: "Chinese Passport",
  specs_id_3: "Visa Photo (General)",
  specs_id_4: "HK/Macau Permit",
  specs_edu_1: "1-inch Standard",
  specs_edu_2: "2-inch Standard",
  specs_edu_3: "Small 1-inch",
  specs_edu_4: "Small 2-inch",
  specs_edu_5: "Large 1-inch",
  specs_edu_6: "Graduate Exam",
  specs_edu_7: "CET-4/6 Exam",
  specs_edu_8: "CHSI Avatar",
  specs_work_1: "Resume Photo",
  specs_work_2: "Teacher Cert",
  specs_work_3: "Junior Accountant",
  specs_work_4: "Constructor L1",
  specs_work_5: "Practicing Physician",
  specs_work_6: "Social Security Card",
  specs_drive_1: "Driver's License",
  specs_drive_2: "Vehicle License",
  specs_color_white: "White",
  specs_color_blue: "Blue",
  specs_color_rbw: "Red/Blue/White",
  specs_color_bw: "Blue/White",

  guide_light_1: "Use <strong>even, soft natural light</strong> or a softbox, avoid direct sunlight",
  guide_light_2: "Keep left-right lighting symmetrical, avoid one-side shadows",
  guide_light_3: "Recommend <strong>front lighting</strong>, avoid side or backlight",
  guide_light_4: "If using phone flash, keep 1.5m+ distance to avoid overexposure",
  guide_posture_1: "Head centered, <strong>both ears visible</strong>, not tilted",
  guide_posture_2: "Shoulders level, body facing the camera directly",
  guide_posture_3: "Chin slightly tucked, avoid looking up or down",
  guide_posture_4: "Eyes <strong>looking straight at the lens</strong>, naturally open",
  guide_expr_1: "Natural expression, <strong>lips closed</strong>, no teeth showing",
  guide_expr_2: "Slight smile is OK but don't exaggerate",
  guide_expr_3: "Eyes naturally open, not squinting",
  guide_expr_4: "Some IDs require <strong>no smiling</strong> (e.g. passport), check in advance",
  guide_dress_1: "Wear <strong>dark collared</strong> clothing, contrast with background",
  guide_dress_2: "White background → don't wear white/light top",
  guide_dress_3: "Blue background → don't wear blue top",
  guide_dress_4: "Avoid tank tops, sleeveless, or low-cut tops",
  guide_dress_5: "Uniform-type ID photos require corresponding uniform",
  guide_hair_1: "Hair should not cover eyebrows or ears",
  guide_hair_2: "Long hair should be tied back or placed behind shoulders",
  guide_hair_3: "Bangs should not cover eyebrows",
  guide_hair_4: "Avoid overly fluffy hairstyles",
  guide_acc_1: "Generally <strong>no hats allowed</strong>",
  guide_acc_2: "Glasses: some IDs allow them, but lenses <strong>must not reflect</strong>",
  guide_acc_3: "No tinted glasses or sunglasses",
  guide_acc_4: "Earrings, necklaces etc. should be removed",
  guide_acc_5: "Religious headwear requires special approval",
  guide_phone_1: "Use the <strong>rear camera</strong> for better quality",
  guide_phone_2: "Distance 1~1.5m, use <strong>2x zoom</strong> to reduce distortion",
  guide_phone_3: "Have someone else take the photo, avoid selfie distortion",
  guide_phone_4: "Enable grid lines to help center alignment",
  guide_phone_5: "Use a tripod for stability",
  guide_bg_1: "Background should be <strong>solid color, clutter-free</strong>",
  guide_bg_2: "Common: white, blue (#438EDB), red (#FF0000)",
  guide_bg_3: "If background is not pure, use this tool's AI removal to replace",
  guide_bg_4: "Stand close to a wall when shooting to reduce shadows",
  guide_flow_1: "Confirm ID photo specs (size, background color)",
  guide_flow_2: "Shoot original photo following the guide",
  guide_flow_3: "Upload to this tool, AI removes background",
  guide_flow_4: "Select target background color",
  guide_flow_5: "Select output size specification",
  guide_flow_6: "Download the finished ID photo",

  batch_size_1inch: "1-inch (295×413)",
  batch_size_2inch: "2-inch (413×579)",
  batch_size_big1inch: "Large 1-inch (390×567)",
  batch_size_small2inch: "Small 2-inch (413×526)",

  faq_q1: "What are the background color requirements for ID photos?",
  faq_a1_title: "Common background color requirements:",
  faq_a1_1: "<strong>White</strong>: ID card, passport, driver's license, social security card, and most IDs",
  faq_a1_2: "<strong>Blue</strong> (~#438EDB): graduation cert, degree cert, CET-4/6, some qualification exams",
  faq_a1_3: "<strong>Red</strong> (~#FF0000): some marriage certs, insurance, union, etc.",
  faq_a1_end: "Please refer to the official notice of the issuing authority for specific requirements.",
  faq_q2: "What's the difference between AI cutout and manual color pick?",
  faq_a2_1: "<strong>AI Remove Background</strong>: Uses a deep learning model to automatically identify the foreground subject. Better results but slightly slower. Suitable for photos with complex or impure backgrounds.",
  faq_a2_2: "<strong>Manual Color Pick</strong>: Click on the background color to remove it based on color tolerance. Faster. Suitable for photos with solid, distinct background colors.",
  faq_a2_3: "It's recommended to use AI mode first. If unsatisfied with the result, reset and try manual mode.",
  faq_q3: "Can the processed ID photo be used directly?",
  faq_a3_1: "ID photos generated by this tool are <strong>for reference and everyday use only</strong>. For official IDs (ID card, passport, etc.), it's recommended to visit a professional photo studio because:",
  faq_a3_2: "Some IDs have strict requirements for head proportion and eye position",
  faq_a3_3: "Online submission may require specific format or electronic verification",
  faq_a3_4: "Print quality depends on resolution and color space",
  faq_a3_5: "For informal scenarios like resumes, badges, or exam registration, this tool is sufficient.",
  faq_q4: "Why does the AI model load slowly?",
  faq_a4_1: "On first use, the AI model needs to be downloaded to the browser cache:",
  faq_a4_2: "<strong>AI model</strong> (high-quality mode): ~183MB, slower on first load, cached in browser, auto-cleared when browser closes",
  faq_a4_3: "Once downloaded, the model is cached in the browser. No re-download needed for subsequent uses. If network is slow, please wait patiently.",
  faq_q5: "Is my photo safe? Will it be uploaded to a server?",
  faq_a5_1: "<strong>Completely safe!</strong> All processing is done locally in the browser:",
  faq_a5_2: "Photos are never uploaded to any server",
  faq_a5_3: "AI model runs on local WebGPU inference",
  faq_a5_4: "Results are only stored in your browser memory",
  faq_a5_5: "All data is automatically cleared when you close the page",
  faq_q6: "What image formats are supported?",
  faq_a6_1: "Supports uploading <strong>JPG / PNG / WebP</strong> format images, recommended under 4MB.",
  faq_a6_2: "Output format is <strong>PNG</strong> (supports transparent background). Convert to JPEG after download if needed.",
  faq_q7: "Why is the cutout result not ideal?",
  faq_a7_1: "Possible reasons and improvement suggestions:",
  faq_a7_2: "<strong>Background color similar to subject</strong>: AI may misjudge, try reshooting with a solid background",
  faq_a7_3: "<strong>Residual shadows at hair edges</strong>: This is an inherent limitation of the AI model, try switching to the high-quality model",
  faq_a7_4: "<strong>Image resolution too low</strong>: Use images above 500px",
  faq_a7_5: "<strong>Multiple people/complex scene</strong>: This tool is optimized for single-person ID photos, complex scenes have limited results",
  faq_q8: "How many images can be batch processed at once?",
  faq_a8_1: "There's no hard limit, but it's recommended to process no more than <strong>20 images</strong> at a time because:",
  faq_a8_2: "Each image requires GPU and memory resources",
  faq_a8_3: "Too many images may cause browser out-of-memory",
  faq_a8_4: "Processing time is proportional to the number of images",
  faq_a8_5: "Process in batches if you need more.",
  faq_q9: "Contact us?",
  faq_a9_1: "If you have any questions or suggestions, feel free to contact me: jsj999jcy@gmail.com",
  faq_a9_2: "Feature pain points, usage bugs, welcome to email me",
  faq_a9_3: "This project is community-funded, hosted on a small server. If inaccessible, contact me to renew the server/domain",
  faq_a9_4: "Free to use, non-commercial project, no commercial support provided, do not abuse",
  faq_a9_5: "Project dependencies are free and open-source, under Apache-2.0 or MIT license",
};

const dictionaries = { zh, en };

let currentLang = localStorage.getItem("lang") || "zh";

function t(key, ...args) {
  let text = (dictionaries[currentLang] || dictionaries.zh)[key] || dictionaries.zh[key] || key;
  args.forEach((arg, i) => {
    text = text.replace(`{${i}}`, arg);
  });
  return text;
}

function switchLang(lang) {
  if (!dictionaries[lang]) return;
  currentLang = lang;
  localStorage.setItem("lang", lang);
  document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
  applyTranslations();
}

function applyTranslations() {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    const val = t(key);
    if (val !== key && (val.includes("<") || val.includes("&"))) {
      el.innerHTML = val;
    } else {
      el.textContent = val;
    }
  });

  document.querySelectorAll("[data-i18n-html]").forEach((el) => {
    const key = el.getAttribute("data-i18n-html");
    el.innerHTML = t(key);
  });

  document.querySelectorAll("[data-i18n-title]").forEach((el) => {
    const key = el.getAttribute("data-i18n-title");
    el.title = t(key);
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.getAttribute("data-i18n-placeholder");
    el.placeholder = t(key);
  });

  document.title = t("title");

  const langBtn = document.getElementById("langToggle");
  if (langBtn) {
    langBtn.textContent = currentLang === "zh" ? "EN" : "中文";
  }

  const tolLabel = document.getElementById("toleranceLabel");
  if (tolLabel) {
    const tolVal = document.getElementById("toleranceValue")?.textContent || "30";
    tolLabel.textContent = "";
    const textNode = document.createTextNode(t("label_tolerance", tolVal).split(":")[0] + ": ");
    tolLabel.appendChild(textNode);
    const span = document.createElement("span");
    span.id = "toleranceValue";
    span.textContent = tolVal;
    tolLabel.appendChild(span);
  }

  const featherLabel = document.getElementById("featherLabel");
  if (featherLabel) {
    const featherVal = document.getElementById("featherValue")?.textContent || "2";
    featherLabel.textContent = "";
    const prefix = t("label_feather", featherVal).split(":")[0] + ": ";
    const textNode = document.createTextNode(prefix);
    featherLabel.appendChild(textNode);
    const span = document.createElement("span");
    span.id = "featherValue";
    span.textContent = featherVal;
    featherLabel.appendChild(span);
  }
}

function getCurrentLang() {
  return currentLang;
}

export { t, switchLang, applyTranslations, getCurrentLang };