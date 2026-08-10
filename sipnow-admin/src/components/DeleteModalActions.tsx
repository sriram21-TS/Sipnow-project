interface DeleteModalActionsProps {
  formErr: string;
  isPending: boolean;
  onCancel: () => void;
  onDelete: () => void;
}

export default function DeleteModalActions({
  formErr,
  isPending,
  onCancel,
  onDelete,
}: DeleteModalActionsProps) {
  return (
    <>
      {formErr && <p className="text-sm text-red-600 mt-2">{formErr}</p>}
      <div className="flex justify-end gap-2 mt-5">
        <button
          onClick={onCancel}
          className="text-sm text-gray-600 border border-gray-200 rounded-lg px-4 py-2 hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={onDelete}
          disabled={isPending}
          className="text-sm bg-red-500 text-white rounded-lg px-4 py-2 hover:bg-red-600 disabled:opacity-60 transition-colors"
        >
          {isPending ? "Deleting…" : "Delete"}
        </button>
      </div>
    </>
  );
}
