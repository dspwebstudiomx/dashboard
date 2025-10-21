import React from 'react';
import Button from '@components/Botones/Button';

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
				<div className="flex gap-4 flex-col items-start justify-start">
					<label className="text-xl text-gray-600 dark:text-gray-300 flex items-center gap-2 font-semibold mb-6">
						Código de cupón
					</label>
					<div className="flex items-center justify-center">
						<input
							className="p-2 md:p-4 rounded border flex-1 h-12 md:w-[320px]"
							type="text"
							name="coupon"
							value={coupon}
							onChange={(e) => setcoupon(e.target.value)}
							placeholder="Ingresa tu cupón"
							onKeyDown={(e) => {
								if (e.key === 'Enter') e.preventDefault();
							}}
						/>

						<div className="flex items-center justify-end gap-2 mt-2 md:mt-0">
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
