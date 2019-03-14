var visitTrend = [
  {
    "ref_date": "20170701",   //日期
    "visit_uv": 4,        //访问人数
  },
  {
    "ref_date": "20170702",
    "visit_uv": 8,
  },
  {
    "ref_date": "20170703",
    "visit_uv": 10,
  },
  {
    "ref_date": "20170704",
    "visit_uv": 2,
  },
  {
    "ref_date": "20170705",
    "visit_uv": 5,
  },
  {
    "ref_date": "20170706",
    "visit_uv": 10,
  },
  {
    "ref_date": "20170707",
    "visit_uv": 11,
  },
  {
    "ref_date": "20170708",
    "visit_uv": 18,
  },
  {
    "ref_date": "20170709",
    "visit_uv": 11,
  },
  {
    "ref_date": "20170710",
    "visit_uv": 13,
  },
  {
    "ref_date": "20170711",
    "visit_uv": 9,
  },
  {
    "ref_date": "20170712",
    "visit_uv": 7,
  },
  {
    "ref_date": "20170713",
    "visit_uv": 12,
  },
  {
    "ref_date": "20170714",
    "visit_uv": 29,
  },
  {
    "ref_date": "20170715",
    "visit_uv": 18,
  },
  {
    "ref_date": "20170716",
    "visit_uv": 18,
  },
  {
    "ref_date": "20170717",
    "visit_uv": 24,
  },
  {
    "ref_date": "20170718",
    "visit_uv": 12,
  },
  {
    "ref_date": "20170719",
    "visit_uv": 20,
  },
  {
    "ref_date": "20170720",
    "visit_uv": 14,
  },
  {
    "ref_date": "20170721",
    "visit_uv": 27,
  },
  {
    "ref_date": "20170722",
    "visit_uv": 35,
  },
  {
    "ref_date": "20170723",
    "visit_uv": 34,
  },
  {
    "ref_date": "20170724",
    "visit_uv": 34,
  },
  {
    "ref_date": "20170725",
    "visit_uv": 21,
  },
  {
    "ref_date": "20170726",
    "visit_uv": 27,
  },
  {
    "ref_date": "20170727",
    "visit_uv": 44,
  },
  {
    "ref_date": "20170728",
    "visit_uv": 41,
  },
  {
    "ref_date": "20170729",
    "visit_uv": 52,
  },
  {
    "ref_date": "20170730",
    "visit_uv": 42,
  },
  {
    "ref_date": "20170731",
    "visit_uv": 49,
  }
]

var visitDistribution = [
  {
    key: 16,
    value: 175
  },
  {
    key: 15,
    value: 333
  },
  {
    key: 14,
    value: 87
  },
  {
    key: 13,
    value: 67
  },
  {
    key: 12,
    value: 230
  },
  {
    key: 11,
    value: 111
  },
  {
    key: 10,
    value: 99
  },
  {
    key: 9,
    value: 10
  },
  {
    key: 8,
    value: 44
  },
  {
    key: 7,
    value: 33
  },
  {
    key: 6,
    value: 22
  },
  {
    key: 4,
    value: 6
  },
  {
    key: 3,
    value: 322
  },
  {
    key: 2,
    value: 16
  },
  {
    key: 1,
    value: 164
  }]

var userPortraitForGender = [
  {
    id: 0,
    name: "未知",
    ref_date: "20170731",
    value: 1
  },
  {
    id: 1,
    name: "男",
    ref_date: "20170731",
    value: 14
  },
  {
    id: 2,
    name: "女",
    ref_date: "20170731",
    value: 6
  }
]

var userPortraitForAge = [
  {
    id: 0,
    name: "未知",
    ref_date: "20170801",
    value: 1
  },
  {
    id: 1,
    name: "17岁以下",
    ref_date: "20170801",
    value: 0
  },
  {
    id: 2,
    name: "18-24岁",
    ref_date: "20170801",
    value: 35
  },
  {
    id: 3,
    name: "25-29岁",
    ref_date: "20170801",
    value: 32
  },
  {
    id: 4,
    name: "30-39岁",
    ref_date: "20170801",
    value: 36

  },
  {
    id: 5,
    name: "40-49岁",
    ref_date: "20170801",
    value: 6
  },
  {
    id: 6,
    name: "50岁以上",
    ref_date: "20170801",
    value: 4
  }]

module.exports = {
  visitTrend: visitTrend,
  visitDistribution: visitDistribution,
  userPortraitForGender: userPortraitForGender,
  userPortraitForAge: userPortraitForAge
}
