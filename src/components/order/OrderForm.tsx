"use client";

import { useState } from "react";
import { useOrder } from "@/context/OrderContext";
import { ChevronLeftIcon } from "@/components/icons";
import type { CustomerInfo } from "@/types";

const initialForm: CustomerInfo = {
  businessName: "",
  contactName: "",
  email: "",
  phone: "",
  licenseNumber: "",
  street: "",
  city: "",
  state: "",
  zip: "",
  notes: "",
};

export function OrderForm() {
  const { state, dispatch } = useOrder();
  // Seed from context so data survives Back → Forward navigation between steps.
  // We intentionally initialize lazily so `customerInfo` changes later (e.g.
  // RESET_ORDER) don't wipe local edits mid-typing.
  const [form, setForm] = useState<CustomerInfo>(
    () => state.customerInfo ?? initialForm
  );
  const [errors, setErrors] = useState<Partial<Record<keyof CustomerInfo, string>>>({});

  const update = (field: keyof CustomerInfo, value: string) => {
    setForm((prev) => {
      const next = { ...prev, [field]: value };
      // Persist each keystroke to context so a parent re-mount (or drawer close
      // + reopen) always restores exactly what the user typed.
      dispatch({ type: "SET_CUSTOMER_INFO", info: next });
      return next;
    });
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof CustomerInfo, string>> = {};
    if (!form.contactName.trim()) newErrors.contactName = "Required";
    if (!form.email.trim()) newErrors.email = "Required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "Invalid email";
    if (!form.phone.trim()) newErrors.phone = "Required";
    if (!form.street.trim()) newErrors.street = "Required";
    if (!form.city.trim()) newErrors.city = "Required";
    if (!form.state.trim()) newErrors.state = "Required";
    if (!form.zip.trim()) newErrors.zip = "Required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    dispatch({ type: "SET_CUSTOMER_INFO", info: form });
    dispatch({ type: "SET_PAYMENT_STEP", isPaymentStep: true });
  };

  return (
    <div className="flex flex-col h-full">
      <button
        onClick={() => dispatch({ type: "SET_FORM_STEP", isFormStep: false })}
        className="mb-4 flex items-center gap-1 text-xs text-silver hover:text-ivory transition-colors"
      >
        <ChevronLeftIcon size={14} /> Back to Items
      </button>

      <h3 className="mb-1 font-display text-lg font-semibold text-ivory">
        Shipping & Contact
      </h3>
      <p className="mb-6 text-xs text-silver">
        We&apos;ll use this to process your wholesale order request.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-1 flex-col gap-4 overflow-y-auto">
        <Field
          label="Full Name *"
          value={form.contactName}
          onChange={(v) => update("contactName", v)}
          error={errors.contactName}
        />
        <Field
          label="Business / Company Name"
          value={form.businessName}
          onChange={(v) => update("businessName", v)}
        />
        <div className="grid grid-cols-2 gap-3">
          <Field
            label="Email *"
            type="email"
            value={form.email}
            onChange={(v) => update("email", v)}
            error={errors.email}
          />
          <Field
            label="Phone *"
            type="tel"
            value={form.phone}
            onChange={(v) => update("phone", v)}
            error={errors.phone}
          />
        </div>
        <div className="h-px bg-graphite" />
        <p className="text-xs font-medium uppercase tracking-widest text-ash">
          Delivery Address
        </p>

        <Field
          label="Street Address *"
          value={form.street}
          onChange={(v) => update("street", v)}
          error={errors.street}
        />
        <div className="grid grid-cols-3 gap-3">
          <Field
            label="City *"
            value={form.city}
            onChange={(v) => update("city", v)}
            error={errors.city}
          />
          <Field
            label="State *"
            value={form.state}
            onChange={(v) => update("state", v)}
            error={errors.state}
          />
          <Field
            label="ZIP *"
            value={form.zip}
            onChange={(v) => update("zip", v)}
            error={errors.zip}
          />
        </div>
        <Field
          label="Order Notes"
          value={form.notes}
          onChange={(v) => update("notes", v)}
          multiline
        />

        <div className="mt-auto pt-4 border-t border-graphite">
          <button
            type="submit"
            className="w-full rounded-lg bg-forest py-3.5 text-sm font-semibold text-ivory transition-colors hover:bg-emerald"
          >
            Continue to Payment
          </button>
          <p className="mt-3 text-center text-[10px] text-ash">
            Next: choose your preferred payment method.
          </p>
        </div>
      </form>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  error,
  type = "text",
  multiline = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  type?: string;
  multiline?: boolean;
}) {
  const classes =
    "w-full rounded-lg px-3 py-2.5 text-sm text-pearl placeholder:text-ash focus:outline-none " +
    (error
      ? "glass-input border-red-500/50 focus:border-red-500"
      : "glass-input");

  return (
    <div>
      <label className="mb-1 block text-[11px] font-medium text-silver">
        {label}
      </label>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          className={classes + " resize-none"}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={classes}
        />
      )}
      {error && <p className="mt-1 text-[10px] text-red-400">{error}</p>}
    </div>
  );
}
