import React, { useState } from "react"; // useState를 React로부터 가져옵니다
import './Membership2.css';

function Membership2() {
    const [isPetOwner, setIsPetOwner] = useState(true);
    const [petOwnerData, setPetOwnerData] = useState({
        userId: '',
        password: '',
        confirmPassword: '',
        name: '',
        birth: '',
        gender: '',
        phone: '',
        email: '',
        introduce: '',
        petGender: '',
        petNumber: '',
    });

    const [jobOwnerData, setJobOwnerData] = useState({
        userId: '',
        password: '',
        confirmPassword: '',
        name: '',
        birth: '',
        gender: '',
        phone: '',
        email: '',
    });

    const handleTabChange = (isPetOwner) => {
        setIsPetOwner(isPetOwner);
    };

    const handlePetOwnerChange = (e) => {
        setPetOwnerData({
            ...petOwnerData,
            [e.target.name]: e.target.value,
        });
    };

    const handleJobOwnerChange = (e) => {
        setJobOwnerData({
            ...jobOwnerData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isPetOwner) {
            console.log('반려인 회원가입 폼 제출합니다.', petOwnerData);
        } else {
            console.log('직종인 회원가입 폼 제출합니다.', jobOwnerData);
        }
    };

    const handleCancel = () => {
        window.location.href = "/"; // 홈페이지 주소로 이동
    };

    return (
        <div className="membership-container">
            <header className="membership-header">
                <h1>회원가입</h1>
            </header>
            <section className="membership-content">
                <div className="member-join">
                    <h2>Member Join</h2>
                    <div className="steps">
                        <span>약관동의</span>
                        <span className="active">정보입력</span>
                        <span>가입완료</span>
                    </div>
                </div>
                <section className="form-section">
                    <h2>정보입력</h2>
                    <div className="form-tabs">
                        <button className={isPetOwner ? "tab active" : "tab"} onClick={() => handleTabChange(true)}>반려인</button>
                        <button className={!isPetOwner ? "tab active" : "tab"} onClick={() => handleTabChange(false)}>직종인</button>
                    </div>
                    {isPetOwner ? (
                        <form id="petOwnerForm" onSubmit={handleSubmit}>
                            <label>
                                아이디
                                <input type="text" name="userId" value={petOwnerData.userId} onChange={handlePetOwnerChange} required />
                            </label>
                            <label>
                                비밀번호
                                <input type="password" name="password" value={petOwnerData.password} onChange={handlePetOwnerChange} required />
                            </label>
                            <label>
                                비밀번호 확인
                                <input type="password" name="confirmPassword" value={petOwnerData.confirmPassword} onChange={handlePetOwnerChange} required />
                            </label>
                            <label>
                                이름
                                <input type="text" name="name" value={petOwnerData.name} onChange={handlePetOwnerChange} required />
                            </label>
                            <label>
                                생년월일
                                <input type="date" name="birth" value={petOwnerData.birth} onChange={handlePetOwnerChange} required />
                            </label>
                            <label>
                                성별
                                <select name="gender" value={petOwnerData.gender} onChange={handlePetOwnerChange} required>
                                    <option value="">선택</option>
                                    <option value="male">남자</option>
                                    <option value="female">여자</option>
                                </select>
                            </label>
                            <label>
                                전화번호
                                <input type="tel" name="phone" value={petOwnerData.phone} onChange={handlePetOwnerChange} required />
                            </label>
                            <label>
                                이메일
                                <input type="email" name="email" value={petOwnerData.email} onChange={handlePetOwnerChange} required />
                            </label>
                            <label>
                                반려동물 이름
                                <input type="text" name="introduce" value={petOwnerData.introduce} onChange={handlePetOwnerChange} required />
                            </label>
                            <label>
                                반려동물 성별
                                <select name="petGender" value={petOwnerData.pet_gender} onChange={handlePetOwnerChange} required>
                                    <option value="male">수컷</option>
                                    <option value="female">암컷</option>
                                </select>
                            </label>
                            <label>
                                내장칩 번호
                                <input type="tel" name="petNumber" value={petOwnerData.pet_number} onChange={handlePetOwnerChange} required />
                            </label>
                            <div className="button-section">
                                <button type="submit" className="submit-btn">완료</button>
                                <button type="button" className="cancel-btn" onClick={handleCancel}>취소</button>
                            </div>
                        </form>
                    ) : (
                        <form id="jobOwnerForm" onSubmit={handleSubmit}>
                            <label>
                                아이디
                                <input type="text" name="userId" value={jobOwnerData.userId} onChange={handleJobOwnerChange} required />
                            </label>
                            <label>
                                비밀번호
                                <input type="password" name="password" value={jobOwnerData.password} onChange={handleJobOwnerChange} required />
                            </label>
                            <label>
                                비밀번호 확인
                                <input type="password" name="confirmPassword" value={jobOwnerData.confirmPassword} onChange={handleJobOwnerChange} required />
                            </label>
                            <label>
                                이름
                                <input type="text" name="name" value={jobOwnerData.name} onChange={handleJobOwnerChange} required />
                            </label>
                            <label>
                                생년월일
                                <input type="date" name="birth" value={jobOwnerData.birth} onChange={handleJobOwnerChange} required />
                            </label>
                            <label>
                                성별
                                <select name="gender" value={jobOwnerData.gender} onChange={handleJobOwnerChange} required>
                                    <option value="male">남자</option>
                                    <option value="female">여자</option>
                                </select>
                            </label>
                            <label>
                                전화번호
                                <input type="tel" name="phone" value={jobOwnerData.phone} onChange={handleJobOwnerChange} required />
                            </label>
                            <label>
                                이메일
                                <input type="email" name="email" value={jobOwnerData.email} onChange={handleJobOwnerChange} required />
                            </label>
                            <div className="button-section">
                                <button type="submit" className="submit-btn">완료</button>
                                <button type="button" className="cancel-btn" onClick={handleCancel}>취소</button>
                            </div>
                        </form>
                    )}
                </section>
            </section>
            <footer>
        <div className="footer-contents">
          <div className="footer-links">
            <a href="#">개인정보처리방침</a>
            <a href="#">이메일추출방지정책</a>
          </div>
          <div className="owner">
            대표 : 신명진 <span className="pipe" /> 전화번호 : 031.xxx.xxxx
          </div>
          <div className="copyright">
            © 2024 CHURURUP. All rights reserved.
          </div>
        </div>
      </footer>
        </div>
    );
}

export default Membership2;
