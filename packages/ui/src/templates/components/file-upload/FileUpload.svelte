<script lang="ts">
	import { FileUpload } from '@ark-ui/svelte/file-upload';
	import type {
		FileChangeDetails,
		FileAcceptDetails,
		FileRejectDetails,
		FileMimeType
	} from '@zag-js/file-upload';

	interface Props {
		/** Label text displayed above the dropzone */
		label?: string;
		/** Hint text shown inside the dropzone */
		hint?: string;
		/** Form field name for native submission */
		name?: string;
		/** The accepted file types (MIME types or file extensions) */
		accept?: Record<string, string[]> | FileMimeType | FileMimeType[];
		/** Maximum number of files (set >1 for multi-upload) */
		maxFiles?: number;
		/** Maximum file size in bytes */
		maxFileSize?: number;
		/** Minimum file size in bytes */
		minFileSize?: number;
		/** Whether to allow drag and drop */
		allowDrop?: boolean;
		/** Whether to show image previews for accepted files */
		showPreview?: boolean;
		/** Disable the file upload */
		disabled?: boolean;
		/** Mark as invalid */
		invalid?: boolean;
		/** Mark as required */
		required?: boolean;
		/** Mark as read-only */
		readOnly?: boolean;
		/** Accept directories (webkit only) */
		directory?: boolean;
		/** Camera capture mode */
		capture?: 'user' | 'environment';
		/** Controlled accepted files. Supports bind:acceptedFiles */
		acceptedFiles?: File[];
		/** Default accepted files for uncontrolled mode */
		defaultAcceptedFiles?: File[];
		/** Callback when files change (accepted or rejected) */
		onFileChange?: (details: FileChangeDetails) => void;
		/** Callback when files are accepted */
		onFileAccept?: (details: FileAcceptDetails) => void;
		/** Callback when files are rejected */
		onFileReject?: (details: FileRejectDetails) => void;
		/** Additional CSS classes on the root element */
		class?: string;
	}

	let {
		label,
		hint = 'Drag and drop or click to upload',
		name,
		accept,
		maxFiles = 1,
		maxFileSize,
		minFileSize,
		allowDrop = true,
		showPreview = true,
		disabled = false,
		invalid = false,
		required = false,
		readOnly = false,
		directory,
		capture,
		acceptedFiles = $bindable(),
		defaultAcceptedFiles,
		onFileChange,
		onFileAccept,
		onFileReject,
		class: className
	}: Props = $props();
</script>

<FileUpload.Root
	bind:acceptedFiles
	{defaultAcceptedFiles}
	{name}
	{accept}
	{maxFiles}
	{maxFileSize}
	{minFileSize}
	{allowDrop}
	{disabled}
	{invalid}
	{required}
	{readOnly}
	{directory}
	{capture}
	{onFileChange}
	{onFileAccept}
	{onFileReject}
	class="flex flex-col gap-2 {className ?? ''}"
>
	{#if label}
		<FileUpload.Label
			class="text-km-base-content data-[disabled]:text-km-muted-content text-sm font-medium"
		>
			{label}
		</FileUpload.Label>
	{/if}

	<FileUpload.Dropzone
		class="rounded-km-box border-km-base-300 bg-km-base-100 data-[invalid]:border-km-error data-[dragging]:border-km-primary data-[dragging]:bg-km-primary/5 flex min-h-36 flex-col items-center justify-center gap-3 border-2 border-dashed px-6 py-8 text-center transition-colors duration-150 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50"
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="text-km-muted-content size-8"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
			stroke-width="1.5"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
			/>
		</svg>
		<p class="text-km-muted-content text-sm">{hint}</p>
		<FileUpload.Trigger
			class="rounded-km-field bg-km-primary text-km-primary-content px-4 py-2 text-sm font-medium transition-colors hover:opacity-90 data-[disabled]:pointer-events-none"
		>
			Choose file{maxFiles > 1 ? 's' : ''}
		</FileUpload.Trigger>
	</FileUpload.Dropzone>

	<FileUpload.ItemGroup class="flex flex-col gap-2">
		<FileUpload.Context>
			{#snippet render(context)}
				{#each context.acceptedFiles as file (`${file.name}-${file.size}-${file.lastModified}`)}
					<FileUpload.Item
						{file}
						class="rounded-km-field border-km-base-300 bg-km-base-100 flex items-center gap-3 border p-3"
					>
						{#if showPreview}
							<FileUpload.ItemPreview
								type="image/*"
								{file}
								class="rounded-km-selector bg-km-base-200 flex size-10 shrink-0 items-center justify-center overflow-hidden"
							>
								<FileUpload.ItemPreviewImage {file} class="size-full object-cover" />
							</FileUpload.ItemPreview>

							<FileUpload.ItemPreview
								type=".*"
								{file}
								class="rounded-km-selector bg-km-base-200 flex size-10 shrink-0 items-center justify-center"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="text-km-muted-content size-5"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									stroke-width="1.5"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
									/>
								</svg>
							</FileUpload.ItemPreview>
						{/if}

						<div class="min-w-0 flex-1">
							<FileUpload.ItemName
								{file}
								class="text-km-base-content truncate text-sm font-medium"
							/>
							<FileUpload.ItemSizeText {file} class="text-km-muted-content text-xs" />
						</div>

						<FileUpload.ItemDeleteTrigger
							{file}
							class="rounded-km-selector text-km-muted-content hover:bg-km-base-200 hover:text-km-error shrink-0 p-1.5 transition-colors"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="size-4"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								stroke-width="2"
							>
								<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
							</svg>
						</FileUpload.ItemDeleteTrigger>
					</FileUpload.Item>
				{/each}
			{/snippet}
		</FileUpload.Context>
	</FileUpload.ItemGroup>

	<FileUpload.HiddenInput />
</FileUpload.Root>
