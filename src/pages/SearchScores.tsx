import { useState } from "react";
import { getScores } from "../api/apiServices";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import nodataImage from "../assets/nodata.jpg";
import loadingImage from "../assets/loading.png";

const SearchScores = () => {
    const [sbd, setSbd] = useState<string>("");
    const [columnResult, setColumnResult] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const columnNames = [
        "SBD", "Toán", "Ngữ Văn", "Ngoại Ngữ", "Vật Lí", "Hóa Học", "Sinh Học", "Lịch Sử", "Địa Lí", "GDCD", "MaNN"
    ];

    const handleSearch = async () => {
        if (!sbd.trim()) {
            setError("Vui lòng nhập số báo danh!");
            return;
        } 
        if(sbd.length < 8 || isNaN(Number(sbd))){
            setError("Số báo danh phải có 8 chữ số");
            return;
        }
        setLoading(true);
        setError(null);

        try {
            const result = await getScores(sbd);
            
            console.log("API Response:", result); // Debug API

            if (!result) {
                setError("Không tìm thấy dữ liệu.");
                setColumnResult([]);
            } else {
                const formattedResult = [
                    result.sbd,
                    result.toan ?? "--",
                    result.ngu_van ?? "--",
                    result.ngoai_ngu ?? "--",
                    result.vat_li ?? "--",
                    result.hoa_hoc ?? "--",
                    result.sinh_hoc?? "--",
                    result.lich_su ?? "--",
                    result.dia_li ?? "--",
                    result.gdcd ?? "--",
                    result.ma_ngoai_ngu ?? "--"
                ];
                setColumnResult(formattedResult);
            }
        } catch (err) {
            console.error("API Error:", err);
            setError("Lỗi khi lấy dữ liệu. Vui lòng thử lại.");
            setColumnResult([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-start overflow-x-auto" style={{marginTop: 100}}>
            <div className="flex flex-row items-start w-full bg-gray-300 p-4">
                <div className="flex items-center w-full max-w-sm md:max-w-md relative bg-gray-100 p-2 rounded-lg transition-all duration-300">
                    <input
                        type="text"
                        placeholder="Nhập số báo danh..."
                        value={sbd}
                        onChange={(e) => setSbd(e.target.value)}
                        className="border border-gray-400 rounded-full w-full h-12 px-4 text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    <div className="flex text-gray-400 ">
                        <button
                            onClick={handleSearch}
                            className="flex items-center justify-center h-12 w-16 bg-blue-500 text-white ml-2 border border-blue-500 rounded-full cursor-pointer hover:bg-blue-600 transition"
                        >
                            <div className="absolute top-1/2 transform -translate-y-1/2 text-gray-600">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z"
                                    />
                                </svg>
                            </div>
                        </button>
                    </div>
                </div>
                {error && <p className="ml-10 mt-5 text-red-500">{error}</p>}
            </div>
            {loading && 
                    <div className="flex flex-col items-center justify-center animate-pulse min-h-[200px]">
                    <img src={loadingImage} alt="No data available" className="opacity-70 mt-10 w-48 h-48" />
                    <p className="mt-10 text-xl font-semibold text-blue-600">Dữ liệu đang được tải xuống...</p>
                </div>}
            
            {!loading && columnResult.length === 0  && <div className="flex flex-col items-center justify-center mt-20">
                <img src={nodataImage} alt="No data available" className="w-1/2 opacity-70" />
                <p className="mt-4 text-gray-500 text-lg font-semibold">Chưa có dữ liệu để hiển thị</p>
            </div>}

            {columnResult.length > 0 && !loading && (
                <div className="flex flex-col items-start w-full h-full bg-gray-100 p-4 min-h-[200px] transition-all duration-300">
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
                                <tr>
                                    {columnResult.map((value, i) => (
                                        <td key={i} className="border border-gray-300 px-4 py-2">{value}</td>
                                    ))}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="w-full flex flex-col items-center mt-6">
                        <h2 className="text-xl font-bold my-4">Biểu đồ điểm số</h2>
                        <ResponsiveContainer width="90%" height={300}>
                        <LineChart
                            data={columnNames.slice(1).map((subject, index) => ({
                            subject,
                            score: parseFloat(columnResult[index + 1]) || 0, // Bỏ cột SBD
                            }))}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="subject" />
                            <YAxis domain={[0, 10]} /> 
                            <Tooltip />
                            <Line type="monotone" dataKey="score" stroke="#8884d8" strokeWidth={2} />
                        </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                
            )}
            
        </div>
    );
};

export default SearchScores;
