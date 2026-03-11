$(document).ready(function() {
    const criteriaList = [
        "Khả năng truyền đạt", "Thái độ giảng viên", "Sự tương tác với sinh viên",
        "Kiến thức chuyên môn", "Tổ chức bài giảng", "Khả năng giải đáp thắc mắc",
        "Sự nhiệt tình", "Thời gian giảng dạy phù hợp", "Thái độ đối với câu hỏi của sinh viên",
        "Ứng dụng công nghệ trong giảng dạy", "Khả năng khuyến khích tư duy sáng tạo"
    ];

    // 1. Hiển thị ngày giờ hệ thống khi load trang
    function getCurrentDateTime() {
        const now = new Date();
        const date = now.toLocaleDateString('vi-VN');
        const time = now.toLocaleTimeString('vi-VN');
        $('#submitTime').text(`${date} ${time}`);
    }
    getCurrentDateTime();

    // 2. Tạo các hàng cho bảng tự động
    const tbody = $('#surveyTable tbody');
    criteriaList.forEach((item, index) => {
        let row = `<tr>
            <td>${item}</td>
            ${[1, 2, 3, 4, 5].map(val => `<td><input type="radio" name="crit_${index}" value="${val}"></td>`).join('')}
        </tr>`;
        tbody.append(row);
    });

    // 3. Tính điểm trung bình khi thay đổi radio button
    $('input[type="radio"]').change(function() {
        let total = 0;
        let count = 0;
        let allChecked = true;

        for (let i = 0; i < criteriaList.length; i++) {
            let val = $(`input[name="crit_${i}"]:checked`).val();
            if (val) {
                total += parseInt(val);
                count++;
            } else {
                allChecked = false;
            }
        }

        if (allChecked) {
            let avg = (total / criteriaList.length).toFixed(2);
            $('#averageScoreText').text(avg).css('color', '#27ae60');
        } else {
            $('#averageScoreText').text("Chưa hoàn thành đánh giá").css('color', '#e67e22');
        }
    });

    // 4. Xử lý nút Gửi khảo sát
    $('#submitBtn').click(function() {
        let criteriaResults = {};
        let allChecked = true;

        criteriaList.forEach((item, index) => {
            let val = $(`input[name="crit_${index}"]:checked`).val();
            if (!val) allChecked = false;
            criteriaResults[`Tiêu chí ${index + 1}`] = val || "0";
        });

        if (!allChecked) {
            alert("Vui lòng hoàn thành tất cả các tiêu chí đánh giá!");
            return;
        }

        const finalData = {
            courseName: $('#courseName').val(),
            teacherName: $('#teacherName').val(),
            studentName: $('#studentName').val(),
            submitTime: $('#submitTime').text(),
            criteria: criteriaResults,
            averageScore: $('#averageScoreText').text()
        };

        $('#jsonContent').text(JSON.stringify(finalData, null, 4)).fadeIn();
    });
});