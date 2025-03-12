import { useEffect, useState } from "react";
import { getTop10 } from "../api/apiServices";
import loadingImage from "../assets/loading.png";

const Home = () => {
    const [columnResult, setColumnResult] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const columnNames = ["SBD", "Toán", "Vật Lí", "Hóa Học", "Tổng điểm"];

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const result = await getTop10();
                console.log("API Response:", result);

                if (!Array.isArray(result)) {
                    throw new Error("Dữ liệu trả về không hợp lệ!");
                }

                const formattedResult = result.map((item) => ({
                    sbd: item.sbd ?? "--",
                    toan: item.toan ?? "--",
                    vat_li: item.vat_li ?? "--",
                    hoa_hoc: item.hoa_hoc ?? "--",
                    tong_diem:
                        (parseFloat(item.toan) || 0) +
                        (parseFloat(item.vat_li) || 0) +
                        (parseFloat(item.hoa_hoc) || 0),
                }));

                setColumnResult(formattedResult);
            } catch (err) {
                console.error("API Error:", err);
                setError("Không thể tải dữ liệu. Vui lòng thử lại!");
                setColumnResult([]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="flex flex-col items-center justify-start overflow-x-auto" style={{marginTop: 100}}>
            <div className="w-full bg-gray-300 p-4">
                <p className="text-lg font-bold text-center">DANH SÁCH TOP 10 HỌC SINH KHỐI A</p>
            </div>
            {loading ? (
                <div className="flex flex-col items-center justify-center animate-pulse min-h-[400px]">
                <img src={loadingImage} alt="No data available" className="opacity-70 mt-10 w-48 h-48" />
                <p className="mt-10 text-xl font-semibold text-blue-600">Dữ liệu đang được tải xuống...</p>
            </div>
            ) : error ? (
                <p className="text-center text-red-500 font-semibold w-full">{error}</p>
            ) : columnResult.length === 0 ? (
                <p className="text-center text-gray-500 font-semibold w-full">Không có dữ liệu để hiển thị.</p>
            ) : (
                <div className="w-full bg-gray-300 p-4 mt-2">
                    <div className="overflow-x-auto w-full"> 
                        <table className="w-full min-w-full bg-white border border-gray-300">
                            <thead>
                                <tr className="bg-gray-200">
                                    {columnNames.map((name, i) => (
                                        <th key={i} className="border border-gray-300 px-4 py-2 text-left">{name}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {columnResult.map((row, index) => (
                                    <tr key={index}>
                                        <td className="border border-gray-300 px-4 py-2">{row.sbd}</td>
                                        <td className="border border-gray-300 px-4 py-2">{row.toan}</td>
                                        <td className="border border-gray-300 px-4 py-2">{row.vat_li}</td>
                                        <td className="border border-gray-300 px-4 py-2">{row.hoa_hoc}</td>
                                        <td className="border border-gray-300 px-4 py-2 font-bold">{row.tong_diem.toFixed(2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;