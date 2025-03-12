import { useEffect, useState } from "react";
import { postClassify, postDetail } from "../api/apiServices";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import loadingImage from "../assets/loading.png";
interface ScoreData {
    total_students: number;
    average_score: number;
    score_distribution: {
        count_8_or_more: number;
        count_6_to_8: number;
        count_4_to_6: number;
        count_below_4: number;
    };
    percentage_distribution: {
        percent_8_or_more: number;
        percent_6_to_8: number;
        percent_4_to_6: number;
        percent_below_4: number;
    };
}
const Reports = () => {
    const [columnResult, setColumnResult] = useState<ScoreData | null>(null);
    const [scoreDetail, setScoreDetail] = useState<{ subject: string; score: number }[]>([]);
    const [subject, setSubject] = useState("toan");
    const [value, setValue] = useState("");
    const [showModel, setShowModel] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [topStudents, setTopStudents] = useState<any[]>([]);
    const columnNames = [
        "SBD", "Toán", "Ngữ Văn", "Ngoại Ngữ", "Vật Lí", "Hóa Học", "Sinh Học", "Lịch Sử", "Địa Lí", "GDCD", 
    ];
    const topColumn = [
        "sbd", "toan", "ngu_van", "ngoai_ngu", "vat_li", "hoa_hoc", "sinh_hoc", "lich_su", "dia_li", "gdcd",
    ];
    const Mapping:Record<string, string> = {
        toan: "Toán",
        ngu_van: "Ngữ văn",
        ngoai_ngu: "Ngoại ngữ",
        vat_li: "Vật lý",
        hoa_hoc: "Hóa học",
        sinh_hoc: "Sinh học",
        lich_su: "Lịch sử",
        dia_li: "Địa lí",
        gdcd: "GDCD"
    }
    useEffect(()=>{
        setValue(Mapping[subject]);
        console.log(subject)
        const fetchData = async () => {
            setLoading(true)
            setError(null)
            try {
                const result = await postClassify(subject);
                const resultDetail = await postDetail(subject);
                console.log("API Response:", result);
                console.log("API Response:", resultDetail);
                setColumnResult(result);
                const formattedData = Object.entries(resultDetail.score_distribution).map(([key, value]) => ({
                    subject: key.toString(),
                    score: Number(value as number)
                }));
                setScoreDetail(formattedData);
                setTopStudents(resultDetail.top_students);
            }catch(err){
                setError("Không tìm thấy dữ liệu. Vui lòng thử lại!");
                setColumnResult(null);
            }finally {
                setLoading(false)
            }
        };
        fetchData();
    },[subject]);
    return (
        <div className="flex flex-col items-center justify-start overflow-x-auto" style={{marginTop: 100}}>
            <div className="flex flex-row justify-between items-start w-full bg-gray-300 p-4">
                <p className="text-lg font-bold">Phổ điểm môn {value}</p>
                <div className="relative items-center justify-center cursor-pointer hover:bg-gray-100 pl-4 pr-4 rounded-full border"
                onClick={() => setShowModel(!showModel)}>
                    <p className="text-lg font-bold" style={{ userSelect: "none", pointerEvents: "auto" }}>Bộ Lọc</p>
                </div>
            </div>
            {loading ? (
                <div className="flex flex-col items-center justify-center animate-pulse">
                    <img src={loadingImage} alt="No data available" className="opacity-70 mt-10 w-48 h-48" />
                    <p className="mt-10 text-xl font-semibold text-blue-600">Dữ liệu đang được tải xuống...</p>
                </div>
            ) : error ? (
                <p className="text-center text-red-500 font-semibold">{error}</p>
            ) : scoreDetail.length === 0 ? (
                <p className="text-center text-gray-500 font-semibold">Không có dữ liệu để hiển thị.</p>
            ) : (
            <div className="flex flex-col md:flex-row items-start w-full bg-gray-300 p-4 mt-2 gap-4">
                <div className="w-full md:w-2/5 mt-4 md:mt-10">
                    <table className="min-w-full bg-white border border-gray-300">
                        <thead>
                            <tr className="bg-gray-200">

                                <th className="border px-2 py-2 text-left"></th>
                                <th className="border px-2 py-2 text-left"></th>
                                <th className="border px-2 py-2 text-left">Tỉ lệ (%)</th>
                
                            </tr>
                        </thead>
                        <tbody>
                        {columnResult && (
                            [
                                ["Tổng HS", columnResult?.total_students, "-"],
                                ["Điểm TB", columnResult.average_score, "-"],
                                ["Số HS có Điểm >= 8", columnResult.score_distribution.count_8_or_more, columnResult.percentage_distribution.percent_8_or_more],
                                ["Số HS có 6 <= Điểm < 8", columnResult.score_distribution.count_6_to_8, columnResult.percentage_distribution.percent_6_to_8],
                                ["Số HS có 4 <= Điểm < 6", columnResult.score_distribution.count_4_to_6, columnResult.percentage_distribution.percent_4_to_6],
                                ["Số HS có Điểm < 4", columnResult.score_distribution.count_below_4, columnResult.percentage_distribution.percent_below_4]
                            ].map(([label, count, percent], i) => (
                                <tr key={i} className="border">
                                    <td className="border px-2 py-2">{label}</td>
                                    <td className="border px-2 py-2">{count}</td>
                                    <td className="border px-2 py-2">{percent}</td>
                                </tr>
                            ))
                        )}
                        </tbody>
                    </table>
                </div>
                <div className="w-full md:w-3/5 md:ml-10">
                    <p className="text-lg">Biểu đồ điểm thi môn {value}</p>
                    <div className="border-2 border-gray-400 rounded-lg p-4 shadow-md bg-white mt-2">
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={scoreDetail}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="subject" />
                                <YAxis />
                                <Tooltip formatter={(value) => [`${value}`, "Số học sinh"]} />
                                <Bar dataKey="score" fill="#8884d8" barSize={5} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                </div>
            </div>)}
            {!loading && (<div className="flex flex-col justify-between items-start w-full bg-gray-300 p-4">
                <p className="text-lg font-bold mb-10">Top 10 học sinh có điểm {value} cao nhất</p>
                <div className="overflow-x-auto w-full">
                    <table className="min-w-full bg-white border border-gray-300">
                        <thead>
                            <tr className="bg-gray-200">
                                {columnNames.map((name, i) => (
                                    <th key={i} className="border border-gray-300 px-4 py-2 text-left">{name}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {topStudents.map((value, i) => (
                            <tr key ={i}>
                                {topColumn.map((name, j) => (
                                    <td key={j} className="border border-gray-300 px-4 py-2">
                                        {value[name] ?? "-"}
                                    </td>
                                ))}
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>)};
            {showModel && (
                <div className="absolute mt-15 right-4 w-64 bg-white border shadow-lg rounded-lg p-4 transition-transform duration-300">
                    <div className="absolute -top-2 right-8 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-white"></div>
                    <h2 className="text-xl font-bold mb-4">Bộ Lọc</h2>
                    
                    <label className="block mb-2">Chọn môn học:</label>
                    <select
                        className="w-full border rounded p-2"
                        value={subject}
                        onChange={(e) =>{
                            setSubject(e.target.value);
                            setShowModel(false);
                        }}
                    >
                        {Object.keys(Mapping).map((key) => (
                            <option key={key} value={key}>
                                {Mapping[key]}
                            </option>
                        ))}
                    </select>
                    <div className="flex justify-end mt-4">
                        <button
                            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition"
                            onClick={() => setShowModel(false)}
                        >
                            Đóng
                        </button>
                    </div>
                </div>
)}
        </div>
    );
};

export default Reports;
