import { useEffect, useState } from "react";
import { postClassify } from "../api/apiServices";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const Reports = () => {
    const [columnResult, setColumnResult] = useState<any []>([]);
    const [subject, setSubject] = useState("toan");
    const [value, setValue] = useState("");
    const [showModel, setShowModel] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const columnNames = [
        "Tổng HS","Điểm TB","Số HS có Điểm >= 8", "Số HS có 6 <= Điểm < 8", "Số HS có 4 <= Điểm < 6", "Số HS có Điểm < 4"
    ]
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
                console.log("API Response:", result);
            }catch(err){
                setError("Không tìm thấy dữ liệu. Vui lòng thử lại!");
                setColumnResult([]);
            }finally {
                setLoading(false)
            }
        };
        fetchData();
    },[subject]);
    return (
        <div className="fixed top-30 h-full w-4/5 flex-col align-start justify-start">
            <div className="flex flex-row justify-between items-start w-full bg-gray-300 p-4">
                <p className="text-lg font-bold">Phổ điểm môn {value}</p>
                <div className="items-center justify-center cursor-pointer hover:bg-gray-100 pl-4 pr-4 rounded-full border"
                onClick={() => setShowModel(!showModel)}>
                    <p className="text-lg font-bold" style={{ userSelect: "none", pointerEvents: "auto" }}>Bộ Lọc</p>
                </div>
            </div>

            <div className="flex flex-row items-start w-full bg-gray-300 p-4 mt-2">
                <div className="overflow-x-auto w-2/5">
                    <table className="min-w-full bg-white border border-gray-300">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="border border-gray-300 px-4 py-4 text-left"></th>
                                <th className="border border-gray-300 px-4 py-4 text-left"></th>
                                <th className="border border-gray-300 px-4 py-4 text-left">Tỉ lệ(%)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {columnNames.map((name, i) => (
                                <tr key={i} className="bg-gray-200">
                                    <td className="border border-gray-300 px-4 py-4 text-left">{name}</td>
                                    <td className="border border-gray-300 px-4 py-4 text-left">---</td>
                                    <td className="border border-gray-300 px-4 py-4 text-left">---</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="w-3/5 ml-10">
                    <p className="text-lg">Biểu đồ điểm thi môn {value}</p>
                    <div className="border-2 border-gray-400 rounded-lg p-4 shadow-md bg-white mt-2">
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart
                                data={Array.from({ length: 41 }, (_, i) => ({
                                    subject: (i * 0.25).toFixed(2), 
                                    score: Math.floor(Math.random() * 300000), 
                                }))}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis 
                                    dataKey="subject" 
                                    type="number" 
                                    domain={[0, 10]} 
                                    tickCount={41}  
                                    interval={0}  
                                    tick={{ fontSize: 8 }}
                                />
                                <YAxis 
                                    domain={[0, 300000]} 
                                    tickCount={7} 
                                    tick={{ fontSize: 10 }}
                                />
                                <Tooltip />
                                <Bar dataKey="score" fill="#8884d8" barSize={8} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                </div>
            </div>
            {showModel && (
    <div className="absolute top-15 right-4 w-64 bg-white border shadow-lg rounded-lg p-4 transition-transform duration-300">
        <div className="absolute -top-2 right-8 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-white"></div>
        <h2 className="text-xl font-bold mb-4">Bộ Lọc</h2>
        
        <label className="block mb-2">Chọn môn học:</label>
        <select
            className="w-full border rounded p-2"
            value={subject}
            onChange={(e) =>{
                setSubject(e.target.value);
                console.log(subject)
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
