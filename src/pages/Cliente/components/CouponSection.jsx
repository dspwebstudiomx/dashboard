import React from 'react';
import Button from '@components/Botones/Button';
import { BsFillTagFill } from 'react-icons/bs';

const CouponSection = ({
	coupon,
	setcoupon,
	validarcoupon,
	setdiscount,
	setcouponMsg,
	couponMsg,
}) => {
	return (
		<div className="flex flex-col gap-2 items-right justify-center">
			<div id="coupon-section" className="flex flex-col md:flex-row gap-4 items-end justify-start">
				<div className="flex flex-col items-start justify-start w-full">
					<label className="text-gray-800 dark:text-gray-800 flex items-center gap-2 font-semibold mb-6 text-2xl">
						<BsFillTagFill className="h-6 w-6 text-blue-700" />
						Código de cupón
					</label>
					<div className="flex items-center justify-between gap-4 w-full">
						<div className="w-[320px]">
							<input
								className="p-2 md:p-4 border flex-1 h-12 md:w-[320px] rounded-xl"
								type="text"
								name="coupon"
								value={coupon}
								onChange={(e) => setcoupon(e.target.value)}
								placeholder="Ingresa tu cupón"
								onKeyDown={(e) => {
									if (e.key === 'Enter') e.preventDefault();
								}}
							/>
						</div>

						<div className="flex items-center justify-end gap-0 mt-2 md:mt-0">
							<Button
								variant="primary"
								type="button"
								onClick={validarcoupon}
								text="Validar cupón"
							/>
							<Button
								type="button"
								onClick={() => {
									setcoupon('');
									setdiscount(0);
									setcouponMsg('');
								}}
								variant="secondary"
								text="Reiniciar cupón"
							/>
						</div>
					</div>
				</div>
			</div>
			{couponMsg && (
				<span
					className={
						'text-sm ' + (couponMsg && couponMsg.includes('%') ? 'text-green-600' : 'text-red-500')
					}
				>
					{couponMsg}
				</span>
			)}
		</div>
	);
};

export default CouponSection;
